Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param(
        [string]$SrcPath,
        [string]$DstPath,
        [int]$MaxDim,
        [string]$Format = "jpeg",
        [int]$Quality = 80
    )
    $img = [System.Drawing.Image]::FromFile($SrcPath)
    $ratio = [Math]::Min(1.0, $MaxDim / [Math]::Max($img.Width, $img.Height))
    $newW = [int]([Math]::Round($img.Width * $ratio))
    $newH = [int]([Math]::Round($img.Height * $ratio))

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    if ($Format -eq "jpeg") {
        $g.Clear([System.Drawing.Color]::White)
    }
    $g.DrawImage($img, 0, 0, $newW, $newH)

    if ($Format -eq "jpeg") {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)
        $bmp.Save($DstPath, $codec, $params)
    } else {
        $bmp.Save($DstPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    $sz = [Math]::Round((Get-Item $DstPath).Length / 1kb)
    Write-Output "$DstPath -> ${newW}x${newH}, ${sz}KB"
}

$root = "F:\Codes\AGOSTINA\WEB\agostinapizzas-web"
$src = "$root\assets\fotos-reales"
$dst = "$root\assets"

Resize-Image "$src\LOVERS\Pizza Agostina.jpg"            "$dst\hero-pepperoni.jpg"  1920 jpeg 78
Resize-Image "$src\LOVERS\Pizza Giulianna.jpg"            "$dst\product-pizza.jpg"   1400 jpeg 80
Resize-Image "$src\LOVERS\Pizza Bianca.jpg"               "$dst\kitchen-atmo.jpg"    1300 jpeg 78
Resize-Image "$src\PROMOCIONES\Combo Futbolera 1.jpg"     "$dst\eventos-pizza.jpg"   1300 jpeg 78

Resize-Image "$src\LOVERS\Pizza Giulianna.jpg"            "$dst\menu-giulianna.jpg"  700 jpeg 75
Resize-Image "$src\LOVERS\Pizza Bianca.jpg"               "$dst\menu-bianca.jpg"     700 jpeg 75
Resize-Image "$dst\menu-cate.jpg"                         "$dst\menu-cate.jpg"       700 jpeg 75
Resize-Image "$src\LOVERS\Pizza Delfina.jpg"               "$dst\menu-delfina.jpg"   700 jpeg 75
Resize-Image "$src\LOVERS\Pizza Isabella.jpg"              "$dst\menu-isabella.jpg"  700 jpeg 75
Resize-Image "$src\LOVERS\Pizza Margarita.jpg"             "$dst\menu-margarita.jpg" 700 jpeg 75

Resize-Image "$src\LOGOS EN GENERAL\LOGO CIRCULAR\LOGO CIRCULAR PNG\LOGO CIRCUALR ROJO.png"  "$dst\badge-red.png"   400 png
Resize-Image "$src\LOGOS EN GENERAL\LOGO CIRCULAR\LOGO CIRCULAR PNG\LOGO CIRCUALR VERDE.png" "$dst\badge-olive.png" 400 png
Resize-Image "$src\LOGOS EN GENERAL\LOGO\LOGO PNG\LOGO CREMA.png"                            "$dst\logo-cream.png"  400 png
