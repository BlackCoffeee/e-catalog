/**
 * @author Muhammad Arif Budiman - [https://github.com/BlackCoffeee]
 * @createAt 2026-10-24
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REF_DIR = path.join(process.cwd(), 'docs', 'reference');
const DEST_DIR = path.join(process.cwd(), 'public', 'assets', 'programs');
const HERO_DEST = path.join(process.cwd(), 'public', 'assets', 'hero-campus.png');

const mapping: Record<string, string> = {
  'Diploma Tiga Kebidanan.heif': 'diploma-tiga-kebidanan.png',
  'Sarjana Akuntansi.heif': 'sarjana-akuntansi.png',
  'Sarjana Farmasi.heif': 'sarjana-farmasi.png',
  'Sarjana Hukum.heif': 'sarjana-hukum.png',
  'Sarjana Kebidanan.heif': 'sarjana-kebidanan.png',
  'Sarjana Keperawatan.heif': 'sarjana-keperawatan.png',
  'Sarjana Manajemen.heif': 'sarjana-manajemen.png',
  'Sarjana Pendidikan Bahasa Inggris.heif': 'sarjana-pendidikan-bahasa-inggris.png',
  'Sarjana Sistem Informasi.heif': 'sarjana-sistem-informasi.png',
  'Sarjana Teknik Industri.heif': 'sarjana-teknik-industri.png',
  'Sarjana Teknologi Informasi.heif': 'sarjana-teknologi-informasi.png',
  'Sarjana Terapan Promosi Kesehatan.heif': 'sarjana-terapan-promosi-kesehatan.png',
};

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

for (const [sourceFile, targetFile] of Object.entries(mapping)) {
  const sourcePath = path.join(REF_DIR, sourceFile);
  const targetPath = path.join(DEST_DIR, targetFile);

  if (fs.existsSync(sourcePath)) {
    // macOS sips tool native conversion from HEIF to PNG with resize/optimization
    execSync(`sips -s format png "${sourcePath}" --out "${targetPath}" -Z 1200`, { stdio: 'pipe' });
  }
}

// Copy and resize hero photo
const heroSource = path.join(REF_DIR, 'Foto Beranda Depan.png');
if (fs.existsSync(heroSource)) {
  execSync(`sips -s format png "${heroSource}" --out "${HERO_DEST}" -Z 1600`, { stdio: 'pipe' });
}
