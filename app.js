import readline from 'readline';
import Video from './src/video.js';
import { close } from './src/db.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function questionAsync(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function menu() {
  console.log('\n=== Streaming Vídeos - Menu ===');
  console.log('1. Inserir novo vídeo');
  console.log('2. Buscar vídeo por título');
  console.log('3. Listar todos os vídeos');
  console.log('4. Deletar vídeo por ID');
  console.log('5. Inserir lista de vídeos');
  console.log('6. Sair');
  const option = await questionAsync('Escolha uma opção: ');
  return option.trim();
}

async function inserirVideo() {
  try {
    const title = await questionAsync('Título: ');
    const description = await questionAsync('Descrição (opcional): ');
    const url = await questionAsync('URL: ');
    const durationStr = await questionAsync('Duração (segundos): ');
    const duration = Number(durationStr);

    const video = new Video({ title, description, url, duration });
    const id = await video.save();

    console.log('Vídeo inserido com sucesso! ID:', id);
  } catch (error) {
    console.error('Erro ao inserir vídeo:', error.message);
  }
}

async function buscarVideo() {
  try {
    const title = await questionAsync('Digite parte do título para buscar: ');
    const videos = await Video.findByTitle(title);
    if (videos.length === 0) {
      console.log('Nenhum vídeo encontrado.');
    } else {
      console.log(`Encontrados ${videos.length} vídeo(s):`);
      videos.forEach(v => {
        console.log(`\nID: ${v._id}\nTítulo: ${v.title}\nURL: ${v.url}\nDuração: ${v.duration}s\nDescrição: ${v.description}\nUpload: ${v.uploadDate}`);
      });
    }
  } catch (error) {
    console.error('Erro na busca:', error.message);
  }
}

async function listarTodosVideos() {
  try {
    const videos = await Video.findAll();
    if (videos.length === 0) {
      console.log('Nenhum vídeo cadastrado.');
    } else {
      console.log(`Todos os vídeos (${videos.length}):`);
      videos.forEach(v => {
        console.log(`\nID: ${v._id}\nTítulo: ${v.title}\nURL: ${v.url}\nDuração: ${v.duration}s\nDescrição: ${v.description}\nUpload: ${v.uploadDate}`);
      });
    }
  } catch (error) {
    console.error('Erro ao listar vídeos:', error.message);
  }
}

async function deletarVideo() {
  try {
    const id = await questionAsync('Informe o ID do vídeo para deletar: ');
    const deleted = await Video.deleteById(id.trim());
    if (deleted) {
      console.log('Vídeo deletado com sucesso!');
    } else {
      console.log('Nenhum vídeo encontrado com esse ID.');
    }
  } catch (error) {
    console.error('Erro ao deletar vídeo:', error.message);
  }
}

async function inserirListaDeVideos() {
  const lista = [
    {
      title: 'Introdução ao TypeScript',
      description: 'Aprenda os conceitos básicos do TypeScript.',
      url: 'https://youtube.com/4',
      duration: 720,
      uploadDate: new Date()
    },
    {
      title: 'Construindo uma API com Node.js',
      description: 'Criando uma API RESTful do zero com Node.',
      url: 'https://youtube.com/5',
      duration: 1100,
      uploadDate: new Date()
    },
    {
      title: 'MongoDB Avançado',
      description: 'Consultas complexas e índices no MongoDB.',
      url: 'https://youtube.com/6',
      duration: 950,
      uploadDate: new Date()
    },
    {
      title: 'JavaScript Assíncrono',
      description: 'Promises, async/await e callbacks na prática.',
      url: 'https://youtube.com/7',
      duration: 870,
      uploadDate: new Date()
    },
    {
      title: 'Deploy com Docker',
      description: 'Como empacotar sua aplicação Node usando Docker.',
      url: 'https://youtube.com/8',
      duration: 1200,
      uploadDate: new Date()
    },
    {
      title: 'Clean Code em JavaScript',
      description: 'Melhores práticas para código limpo e legível.',
      url: 'https://youtube.com/9',
      duration: 800,
      uploadDate: new Date()
    },
    {
      title: 'GraphQL vs REST',
      description: 'Comparando abordagens para APIs modernas.',
      url: 'https://youtube.com/10',
      duration: 1050,
      uploadDate: new Date()
    },
    {
      title: 'Firebase para iniciantes',
      description: 'Autenticação, Firestore e deploy com Firebase.',
      url: 'https://youtube.com/11',
      duration: 890,
      uploadDate: new Date()
    },
    {
      title: 'Autenticação com JWT',
      description: 'Implementando login seguro com JSON Web Tokens.',
      url: 'https://youtube.com/12',
      duration: 930,
      uploadDate: new Date()
    },
    {
      title: 'Testes automatizados com Jest',
      description: 'Escrevendo testes unitários para aplicações Node.',
      url: 'https://youtube.com/13',
      duration: 780,
      uploadDate: new Date()
    }
  ];

  try {
    const count = await Video.insertMany(lista);
    console.log(`${count} vídeos inseridos com sucesso!`);
  } catch (error) {
    console.error('Erro ao inserir lista:', error.message);
  }
}

async function main() {
  let exit = false;

  while (!exit) {
    const option = await menu();

    switch (option) {
      case '1':
        await inserirVideo();
        break;
      case '2':
        await buscarVideo();
        break;
      case '3':
        await listarTodosVideos();
        break;
      case '4':
        await deletarVideo();
        break;
      case '5':
        await inserirListaDeVideos();
        break;
      case '6':
        exit = true;
        console.log('Saindo do programa...');
        break;
      default:
        console.log('Opção inválida! Tente novamente.');
    }
  }

  await close();
  rl.close();
}

main();
