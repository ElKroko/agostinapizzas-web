# Genera las fotos web-optimizadas del catalogo completo (Lovers + Picoteos)
# a partir del material fuente en assets/fotos-reales/, y copia los logos SVG
# reales a public/assets/logos/. Se ejecuta una sola vez tras clonar el repo
# o cuando cambie el material fuente en fotos-reales/.

Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param(
        [string]$SrcPath,
        [string]$DstPath,
        [int]$MaxDim,
        [int]$Quality = 78
    )
    if (-not (Test-Path $SrcPath)) {
        Write-Warning "No existe: $SrcPath"
        return
    }
    $img = [System.Drawing.Image]::FromFile($SrcPath)
    $ratio = [Math]::Min(1.0, $MaxDim / [Math]::Max($img.Width, $img.Height))
    $newW = [int]([Math]::Round($img.Width * $ratio))
    $newH = [int]([Math]::Round($img.Height * $ratio))

    $bmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($img, 0, 0, $newW, $newH)

    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [int64]$Quality)
    $bmp.Save($DstPath, $codec, $params)

    $g.Dispose(); $bmp.Dispose(); $img.Dispose()
    $sz = [Math]::Round((Get-Item $DstPath).Length / 1kb)
    Write-Output "$DstPath -> ${newW}x${newH}, ${sz}KB"
}

$root = "F:\Codes\AGOSTINA\WEB\agostinapizzas-web"
$lovers = "$root\assets\fotos-reales\LOVERS"
$picoteos = "$root\assets\fotos-reales\PICOTEOS"
$logos = "$root\assets\fotos-reales\LOGOS EN GENERAL"
$dstPizzas = "$root\public\assets\pizzas"
$dstLogos = "$root\public\assets\logos"

New-Item -ItemType Directory -Force -Path $dstPizzas | Out-Null
New-Item -ItemType Directory -Force -Path $dstLogos | Out-Null

# ---- Agostina Lovers: slug -> archivo fuente ----
$loversMap = @{
    "agostina"  = "Pizza Agostina.jpg"
    "alessia"   = "Pizza Alessia.jpg"
    "amelia"    = "Pizza Amelia.jpg"
    "bianca"    = "Pizza Bianca.jpg"
    "cate"      = "Pizza Cate.png"
    "constanza" = "Pizza Constanza.jpg"
    "delfina"   = "Pizza Delfina.jpg"
    "fabiola"   = "Pizza Fabiola.jpg"
    "gertrudis" = "Pizza Gertrudis.jpg"
    "giannina"  = "Pizza Giannina.jpg"
    "giovanna"  = "Pizza Giovanna.jpeg"
    "giulianna" = "Pizza Giulianna.jpg"
    "isabella"  = "Pizza Isabella.jpg"
    "jacinta"   = "Pizza Jacinta.jpg"
    "julieta"   = "Pizza Julieta.jpg"
    "lorenza"   = "Pizza Lorenza.jpg"
    "lucia"     = "Pizza Lucia 2.jpg"
    "luciana"   = "Pizza Luciana.jpg"
    "margarita" = "Pizza Margarita.jpg"
    "martina"   = "Pizza Martina.jpg"
    "maria"     = "Pizza Maria.jpg"
    "rossa"     = "Pizza Rossa.jpg"
    "sofia"     = "Pizza Sofia.jpg"
}
foreach ($slug in $loversMap.Keys) {
    Resize-Image "$lovers\$($loversMap[$slug])" "$dstPizzas\$slug.jpg" 900 78
}

# ---- Picoteos ----
$picoteosMap = @{
    "agostina-rolls"          = "Agostina Rolls.jpg"
    "bastones-ajo-parmesano"  = "Bastones de Ajo Parmesano.jpg"
    "bruschetta-gratin"       = "Pizza Bruschetta Gratín.jpg"
}
foreach ($slug in $picoteosMap.Keys) {
    Resize-Image "$picoteos\$($picoteosMap[$slug])" "$dstPizzas\$slug.jpg" 900 78
}

# ---- Logos SVG reales (copia directa, sin rasterizar) ----
Copy-Item "$logos\LOGO\LOGOS SVG\LOGO POSITIVO.svg"            "$dstLogos\logo-positivo.svg" -Force
Copy-Item "$logos\LOGO\LOGOS SVG\LOGO NEGATIVO.svg"             "$dstLogos\logo-negativo.svg" -Force
Copy-Item "$logos\LOGO\LOGOS SVG\LOGO COLOR ROJO.svg"           "$dstLogos\logo-rojo.svg" -Force
Copy-Item "$logos\LOGO\LOGOS SVG\LOGO COLOR VERDE.svg"          "$dstLogos\logo-verde.svg" -Force
Copy-Item "$logos\LOGOS SIN TAGLINE\LOGOS SIN TAGLINE SVG\LOGO CREMA SIN TAGLINE.svg" "$dstLogos\logo-compacto-crema.svg" -Force
Copy-Item "$logos\LOGOS SIN TAGLINE\LOGOS SIN TAGLINE SVG\LOGO NEGRO SIN TAGLINE.svg" "$dstLogos\logo-compacto-negro.svg" -Force
Copy-Item "$logos\LOGO CIRCULAR\LOGO CIRCULAR SVG\LOGO CIRCULAR POSITIVO.svg" "$dstLogos\insignia-positivo.svg" -Force
Copy-Item "$logos\LOGO CIRCULAR\LOGO CIRCULAR SVG\LOGO CIRCULAR NEGATIVO.svg" "$dstLogos\insignia-negativo.svg" -Force
Copy-Item "$logos\LOGO CIRCULAR\LOGO CIRCULAR SVG\LOGO CIRCULAR ROJO.svg"     "$dstLogos\insignia-rojo.svg" -Force
Copy-Item "$logos\LOGO CIRCULAR\LOGO CIRCULAR SVG\LOGO CIRCULAR VERDE.svg"    "$dstLogos\insignia-verde.svg" -Force

Write-Output "Logos SVG copiados a $dstLogos"
Write-Output "Listo."
