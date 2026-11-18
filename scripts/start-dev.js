import { spawn } from 'child_process';
import process from 'process';

console.log('\n🧵 ===============================================');
console.log('🧶 Iniciando Fio a Fio (Backend + Frontend)...');
console.log('🧵 ===============================================\n');

// Executa comandos com suporte cross-platform
const backend = spawn('npm', ['run', 'dev', '--prefix', 'backend'], {
  stdio: 'inherit',
  shell: true,
});

const frontend = spawn('npm', ['run', 'dev', '--prefix', 'frontend'], {
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  console.log('\n[Fio a Fio] Encerrando processos...');
  try {
    if (backend && !backend.killed) backend.kill('SIGINT');
  } catch (e) {}
  try {
    if (frontend && !frontend.killed) frontend.kill('SIGINT');
  } catch (e) {}
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

backend.on('error', (err) => {
  console.error('[Backend Error]', err);
});

frontend.on('error', (err) => {
  console.error('[Frontend Error]', err);
});
