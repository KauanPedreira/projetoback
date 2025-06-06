// app.js

import readline from 'readline';
import Video from './src/video.js';
import Usuario from './src/usuario.js';
import Categoria from './src/categoria.js';
import Playlist from './src/playlist.js';
import { close } from './src/db.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// --- LISTAS DE EXEMPLO ---
const listaDeVideosExemplo = [
  { title: 'Introdução ao Node.js', description: 'Conceitos básicos e setup do ambiente.', url: 'https://youtube.com/watch?v=nodeintro', duration: 900 },
  { title: 'JavaScript Moderno', description: 'Features como arrow functions, promises e async/await.', url: 'https://youtube.com/watch?v=es6plus', duration: 1800 },
  { title: 'MongoDB para Iniciantes', description: 'Primeiros passos com o banco de dados NoSQL.', url: 'https://youtube.com/watch?v=mongodb', duration: 1250 },
  { title: 'Desenvolvendo uma API REST', description: 'Construindo uma API do zero com Express.', url: 'https://youtube.com/watch?v=apirest', duration: 3600 }
];
const listaDeUsuariosExemplo = [
  { nome: 'Leandro Pedreira', email: 'leozin@gmail.com', idade: 14 },
  { nome: 'Thales Granja', email: 'thales@hotmail.com', idade: 20 },
  { nome: 'Matheus Madureira', email: 'madureira@gmail.com', idade: 23 }
];
const listaDeCategoriasExemplo = [
  { nome: 'Tecnologia', descricao: 'Vídeos sobre programação, software e hardware.' },
  { nome: 'Música', descricao: 'Clipes, shows e documentários musicais.' },
  { nome: 'Educação', descricao: 'Conteúdo para aprendizado e desenvolvimento.' },
  { nome: 'Comédia', descricao: 'Vídeos de humor e entretenimento.'}
];

// --- FUNÇÕES DE UTILIDADE ---
function questionAsync(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

function printSeparator() {
  console.log('------------------------------------------');
}

async function escolherUsuario(prompt) {
  console.log('\nListando usuários...');
  const usuarios = await Usuario.findAll();
  if (usuarios.length === 0) {
      console.log('Nenhum usuário cadastrado.');
      return null;
  };
  usuarios.forEach(u => console.log(`  ID: ${u._id} - Nome: ${u.nome}`));
  printSeparator();
  const usuarioId = await questionAsync(prompt);
  return usuarioId;
}

function exibirVideos(videos) {
  if (!videos || videos.length === 0) {
      console.log('Nenhum vídeo encontrado.');
      return;
  }
  videos.forEach(v => {
      printSeparator();
      console.log(`ID: ${v._id}\nTítulo: ${v.title}\nDescrição: ${v.description}`);
  });
  printSeparator();
}

// --- MENUS DA APLICAÇÃO ---
async function menuPrincipal() {
  console.log('\n=== Sistema de Streaming ===');
  console.log('1. Gerenciar Vídeos');
  console.log('2. Gerenciar Usuários');
  console.log('3. Gerenciar Categorias');
  console.log('4. Gerenciar Playlists');
  console.log('5. Sair');
  return questionAsync('Escolha uma opção: ');
}

async function menuVideos() {
  console.log('\n--- Menu de Vídeos ---');
  console.log('1. Inserir novo vídeo');
  console.log('2. Buscar vídeo por título');
  console.log('3. Listar todos os vídeos');
  console.log('4. Deletar vídeo por ID');
  console.log('5. Inserir lista de vídeos (Exemplo)');
  console.log('6. Voltar');
  return questionAsync('Escolha uma opção: ');
}

async function menuUsuarios() {
  console.log('\n--- Menu de Usuários ---');
  console.log('1. Inserir novo usuário');
  console.log('2. Buscar usuário por nome');
  console.log('3. Listar todos os usuários');
  console.log('4. Deletar usuário por ID');
  console.log('5. Inserir lista de usuários (Exemplo)');
  console.log('6. Voltar');
  return questionAsync('Escolha uma opção: ');
}

async function menuCategorias() {
  console.log('\n--- Menu de Categorias ---');
  console.log('1. Inserir nova categoria');
  console.log('2. Buscar categoria por nome');
  console.log('3. Listar todas as categorias');
  console.log('4. Deletar categoria por ID');
  console.log('5. Inserir lista de categorias (Exemplo)');
  console.log('6. Voltar');
  return questionAsync('Escolha uma opção: ');
}

async function menuPlaylists() {
    console.log('\n--- Menu de Playlists ---');
    console.log('1. Criar nova playlist');
    console.log('2. Ver playlists de um usuário');
    console.log('3. Adicionar vídeo a uma playlist');
    console.log('4. Ver detalhes de uma playlist');
    console.log('5. Inserir playlists de exemplo');
    console.log('6. Deletar playlist');
    console.log('7. Voltar');
    return questionAsync('Escolha uma opção: ');
}

// --- FUNÇÕES DE LÓGICA PARA VÍDEOS ---
async function inserirVideo() {
  try {
    const title = await questionAsync('Título: ');
    const description = await questionAsync('Descrição (opcional): ');
    const url = await questionAsync('URL: ');
    const duration = Number(await questionAsync('Duração (segundos): '));

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
      videos.forEach(v => {
        printSeparator();
        console.log(`ID: ${v._id}\nTítulo: ${v.title}\nURL: ${v.url}\nDuração: ${v.duration}s\nDescrição: ${v.description}\nUpload: ${v.uploadDate}`);
      });
      printSeparator();
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
      console.log('\n--- Todos os Vídeos ---');
      videos.forEach(v => {
        printSeparator();
        console.log(`ID: ${v._id}\nTítulo: ${v.title}\nURL: ${v.url}\nDuração: ${v.duration}s\nDescrição: ${v.description}\nUpload: ${v.uploadDate}`);
      });
      printSeparator();
    }
  } catch (error) {
    console.error('Erro ao listar vídeos:', error.message);
  }
}
async function deletarVideo() {
  try {
    const id = await questionAsync('Informe o ID do vídeo para deletar: ');
    const deleted = await Video.deleteById(id.trim());
    console.log(deleted ? 'Vídeo deletado com sucesso!' : 'Nenhum vídeo encontrado com esse ID.');
  } catch (error) {
    console.error('Erro ao deletar vídeo:', error.message);
  }
}
async function inserirListaDeVideos() {
  try {
    const count = await Video.insertMany(listaDeVideosExemplo);
    console.log(`${count} vídeos da lista de exemplo foram inseridos com sucesso!`);
  } catch (error) {
    console.error('Erro ao inserir lista de vídeos:', error.message);
  }
}

// --- FUNÇÕES DE LÓGICA PARA USUÁRIOS ---
async function inserirUsuario() {
  try {
    const nome = await questionAsync('Nome: ');
    const email = await questionAsync('Email: ');
    const idade = Number(await questionAsync('Idade: '));
    const usuario = new Usuario({ nome, email, idade });
    const id = await usuario.save();
    console.log('Usuário inserido com sucesso! ID:', id);
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.message);
  }
}
async function buscarUsuario() {
  try {
    const nome = await questionAsync('Digite parte do nome: ');
    const usuarios = await Usuario.findByNome(nome);
    if (usuarios.length === 0) {
      console.log('Nenhum usuário encontrado.');
    } else {
      usuarios.forEach(u => {
        printSeparator();
        console.log(`ID: ${u._id}\nNome: ${u.nome}\nEmail: ${u.email}\nIdade: ${u.idade}`);
      });
      printSeparator();
    }
  } catch (error) {
    console.error('Erro ao buscar usuário:', error.message);
  }
}
async function listarUsuarios() {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      console.log('Nenhum usuário cadastrado.');
    } else {
      console.log('\n--- Todos os Usuários ---');
      usuarios.forEach(u => {
        printSeparator();
        console.log(`ID: ${u._id}\nNome: ${u.nome}\nEmail: ${u.email}\nIdade: ${u.idade}`);
      });
      printSeparator();
    }
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
  }
}
async function deletarUsuario() {
  try {
    const id = await questionAsync('ID do usuário para deletar: ');
    const deleted = await Usuario.deleteById(id.trim());
    console.log(deleted ? 'Usuário deletado!' : 'Nenhum usuário encontrado com esse ID.');
  } catch (error) {
    console.error('Erro ao deletar usuário:', error.message);
  }
}
async function inserirListaDeUsuarios() {
  try {
    const count = await Usuario.insertMany(listaDeUsuariosExemplo);
    console.log(`${count} usuários da lista de exemplo foram inseridos com sucesso!`);
  } catch (error) {
    console.error('Erro ao inserir lista de usuários:', error.message);
  }
}

// --- FUNÇÕES DE LÓGICA PARA CATEGORIAS ---
async function inserirCategoria() {
  try {
    const nome = await questionAsync('Nome da categoria: ');
    const descricao = await questionAsync('Descrição (opcional): ');
    const categoria = new Categoria({ nome, descricao });
    const id = await categoria.save();
    console.log('Categoria criada com sucesso! ID:', id);
  } catch (error) {
    console.error('Erro ao criar categoria:', error.message);
  }
}
async function buscarCategoria() {
  try {
    const nome = await questionAsync('Digite parte do nome: ');
    const categorias = await Categoria.findByNome(nome);
    if (categorias.length === 0) {
      console.log('Nenhuma categoria encontrada.');
    } else {
      categorias.forEach(c => {
        printSeparator();
        console.log(`ID: ${c._id}\nNome: ${c.nome}\nDescrição: ${c.descricao}`);
      });
      printSeparator();
    }
  } catch (error) {
    console.error('Erro ao buscar categoria:', error.message);
  }
}
async function listarCategorias() {
  try {
    const categorias = await Categoria.findAll();
    if (categorias.length === 0) {
      console.log('Nenhuma categoria cadastrada.');
    } else {
      console.log('\n--- Todas as Categorias ---');
      categorias.forEach(c => {
        printSeparator();
        console.log(`ID: ${c._id}\nNome: ${c.nome}\nDescrição: ${c.descricao}`);
      });
      printSeparator();
    }
  } catch (error) {
    console.error('Erro ao listar categorias:', error.message);
  }
}
async function deletarCategoria() {
  try {
    const id = await questionAsync('ID da categoria para deletar: ');
    const deleted = await Categoria.deleteById(id.trim());
    console.log(deleted ? 'Categoria deletada!' : 'Nenhuma categoria encontrada com esse ID.');
  } catch (error) {
    console.error('Erro ao deletar categoria:', error.message);
  }
}
async function inserirListaDeCategorias() {
  try {
    const count = await Categoria.insertMany(listaDeCategoriasExemplo);
    console.log(`${count} categorias da lista de exemplo foram inseridas com sucesso!`);
  } catch (error) {
    console.error('Erro ao inserir lista de categorias:', error.message);
  }
}

// --- FUNÇÕES DE LÓGICA PARA PLAYLISTS ---
async function criarPlaylist() {
    try {
        const usuarioId = await escolherUsuario('Digite o ID do usuário dono da playlist: ');
        if (!usuarioId) return;

        const nome = await questionAsync('Nome da playlist: ');
        const descricao = await questionAsync('Descrição (opcional): ');

        const playlist = new Playlist({ nome, descricao, usuarioId });
        const id = await playlist.save();
        console.log(`Playlist "${nome}" criada com sucesso! ID: ${id}`);
    } catch (error) {
        console.error('Erro ao criar playlist:', error.message);
    }
}
async function verPlaylistsDeUsuario() {
    try {
        const usuarioId = await escolherUsuario('Digite o ID do usuário para ver as playlists: ');
        if (!usuarioId) return;

        const playlists = await Playlist.findByUser(usuarioId);

        if (playlists.length === 0) {
            console.log('Este usuário não possui playlists.');
            return;
        }
        console.log('\n--- Playlists do Usuário ---');
        playlists.forEach(p => {
            printSeparator();
            console.log(`ID: ${p._id}\nNome: ${p.nome}\nDescrição: ${p.descricao}`);
        });
        printSeparator();
    } catch (error) {
        console.error('Erro ao listar playlists:', error.message);
    }
}
async function adicionarVideoAPlaylist() {
    try {
        await verPlaylistsDeUsuario();
        const playlistId = await questionAsync('Digite o ID da playlist para adicionar o vídeo: ');

        console.log('\nListando todos os vídeos disponíveis...');
        const todosVideos = await Video.findAll();
        exibirVideos(todosVideos);
        const videoId = await questionAsync('Digite o ID do vídeo a ser adicionado: ');

        const success = await Playlist.addVideo(playlistId, videoId);
        console.log(success ? 'Vídeo adicionado com sucesso!' : 'Vídeo já estava na playlist.');
    } catch (error) {
        console.error('Erro ao adicionar vídeo:', error.message);
    }
}
async function verDetalhesPlaylist() {
    try {
        const playlistId = await questionAsync('Digite o ID da playlist para ver os detalhes: ');
        const playlist = await Playlist.findByIdWithVideos(playlistId);

        if (!playlist) {
            console.log('Playlist não encontrada.');
            return;
        }
        console.log('\n--- Detalhes da Playlist ---');
        printSeparator();
        console.log(`Nome: ${playlist.nome}`);
        console.log(`Descrição: ${playlist.descricao}`);
        printSeparator();
        console.log('--- Vídeos na Playlist ---');
        exibirVideos(playlist.listaDeVideos);
    } catch (error) {
        console.error('Erro ao ver detalhes da playlist:', error.message);
    }
}
async function deletarPlaylist() {
    try {
        const id = await questionAsync('Informe o ID da playlist para deletar: ');
        const deleted = await Playlist.deleteById(id.trim());
        console.log(deleted ? 'Playlist deletada com sucesso!' : 'Nenhuma playlist encontrada com esse ID.');
    } catch (error) {
        console.error('Erro ao deletar playlist:', error.message);
    }
}
async function inserirListaDePlaylists() {
    try {
        console.log('Criando playlists de exemplo dinamicamente...');
        
        const dono = await Usuario.findOne();
        if (!dono) {
            console.log('Nenhum usuário no banco. Insira usuários de exemplo primeiro.');
            return;
        }
        console.log(`Usando o usuário "${dono.nome}" como dono das playlists.`);

        const videos = await Video.find({}).limit(3).toArray();
        if (videos.length === 0) {
            console.log('Nenhum vídeo no banco. Insira vídeos de exemplo primeiro.');
            return;
        }
        const videoIds = videos.map(v => v._id);

        const listaDePlaylistsExemplo = [
            {
                nome: 'Favoritos de Tecnologia',
                descricao: 'Meus vídeos preferidos sobre Node e JS.',
                usuarioId: dono._id,
                videos: videoIds.slice(0, 2)
            },
            {
                nome: 'Para relaxar',
                descricao: 'Playlists com vídeos diversos.',
                usuarioId: dono._id,
                videos: [videoIds[videoIds.length - 1]]
            }
        ];
        const count = await Playlist.insertMany(listaDePlaylistsExemplo);
        console.log(`${count} playlists de exemplo foram inseridas para o usuário ${dono.nome}!`);
    } catch (error) {
        console.error('Erro ao inserir lista de playlists:', error.message);
    }
}

// --- LÓGICA PRINCIPAL ---
async function gerenciarEntidade(menuFunc, acoes) {
  let back = false;
  const voltarOption = String(Object.keys(acoes).length + 1);

  while (!back) {
    const op = (await menuFunc()).trim();
    if (op === voltarOption) {
      back = true;
      continue;
    }
    const acao = acoes[op];
    if (acao) {
      await acao();
    } else {
      console.log('Opção inválida!');
    }
  }
}

async function main() {
  const acoesVideo = {
    '1': inserirVideo, '2': buscarVideo, '3': listarTodosVideos, '4': deletarVideo, '5': inserirListaDeVideos,
  };
  const acoesUsuario = {
    '1': inserirUsuario, '2': buscarUsuario, '3': listarUsuarios, '4': deletarUsuario, '5': inserirListaDeUsuarios,
  };
  const acoesCategoria = {
    '1': inserirCategoria, '2': buscarCategoria, '3': listarCategorias, '4': deletarCategoria, '5': inserirListaDeCategorias,
  };
  const acoesPlaylist = {
    '1': criarPlaylist,
    '2': verPlaylistsDeUsuario,
    '3': adicionarVideoAPlaylist,
    '4': verDetalhesPlaylist,
    '5': inserirListaDePlaylists,
    '6': deletarPlaylist,
  };

  let exit = false;
  while (!exit) {
    const opt = (await menuPrincipal()).trim();
    switch (opt) {
      case '1': await gerenciarEntidade(menuVideos, acoesVideo); break;
      case '2': await gerenciarEntidade(menuUsuarios, acoesUsuario); break;
      case '3': await gerenciarEntidade(menuCategorias, acoesCategoria); break;
      case '4': await gerenciarEntidade(menuPlaylists, acoesPlaylist); break;
      case '5': exit = true; console.log('Saindo...'); break;
      default: console.log('Opção inválida!');
    }
  }

  await close();
  rl.close();
}

main();