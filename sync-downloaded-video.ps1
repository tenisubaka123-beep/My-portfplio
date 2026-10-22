# Helper to automatically copy the latest downloaded MP4 to public/videos/hero.mp4
$downloadsFolder = [Environment]::GetFolderPath("UserProfile") + "\Downloads"
$latest = Get-ChildItem "$downloadsFolder\*.mp4" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if ($latest) {
    Copy-Item $latest.FullName "C:\Users\yoshi\.gemini\antigravity\scratch\manga-portfolio\public\videos\hero.mp4" -Force
    Write-Host "SUCCESS: Copied '$($latest.Name)' to public/videos/hero.mp4"
} else {
    Write-Host "No MP4 found in Downloads folder yet."
}
