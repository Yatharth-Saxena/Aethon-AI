$desktop = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "AETHON Mission Control.lnk"
$wscript = New-Object -ComObject WScript.Shell
$shortcut = $wscript.CreateShortcut($shortcutPath)
$rootDir = (Get-Item $PSScriptRoot).Parent.FullName
$target = Join-Path $rootDir "launch_app.bat"
$shortcut.TargetPath = $target
$shortcut.WorkingDirectory = $rootDir
$icon = Join-Path $rootDir "icon.ico"
if (Test-Path $icon) {
    $shortcut.IconLocation = "$icon,0"
}
$shortcut.Description = "Launch AETHON Mission Control & Payload Assembly Assistant"
$shortcut.Save()
Write-Host "Desktop shortcut created at: $shortcutPath with icon: $icon"
