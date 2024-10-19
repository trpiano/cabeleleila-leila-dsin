<h1 align="center" id="top">
   Desafio Cabeleleila Leila - DSIN

<br/>
<br/>

<p align="center">
  <a href="https://www.linkedin.com/in/timoteopiano/">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Timoteo%20Piano-%BD93EC">
  </a>
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/trpiano/cabeleleila-leila-dsin?color=%BD93EC">
  <a href="https://github.com/trpiano/cabeleleila-leila-dsin/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/trpiano/cabeleleila-leila-dsin?color=%BD93EC">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/trpiano/cabeleleila-leila-dsin?color=%BD93EC">
</p>

## Screenshots

<div align="center"> 
  <img src="/.github/admin_atualizando_status.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/admin_dashboard_datas_retroativas.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/admin_dashboard.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/admin_editando_agendamento.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/detalhes_de_agendamento_passado.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/novo_usuario_sem_agendamentos.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/sugestao_agendamento_mesma_semana.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/usuario_editando_agendamento.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

<div align="center"> 
  <img src="/.github/usuario_nao_autenticado.png" alt="cabeleleila-leila-dsin" />
</div>
<br/>
<br/>

## Instruções

**Instruções para executar o front-end:**

```bash
git clone https://github.com/trpiano/cabeleleila-leila-dsin.git
cd cabeleleila-leila-dsin/front-end
npm install
# or
pnpm i
# or
yarn install

# Run the project
npm dev
# or
pnpm dev
# or
yarn dev

# The server will initialize in the <http://localhost:3000>
```

**Instruções para executar o back-end:**

```bash
git clone https://github.com/trpiano/cabeleleila-leila-dsin.git
cd cabeleleila-leila-dsin/back-end
npm install
# or
pnpm i
# or
yarn install

# Run the project
npm start
# or
pnpm start
# or
yarn start

# The server will initialize in the <http://localhost:3000>
```

## Variaveis de Ambiente (.env)

```bash
# Renomeie o arquivo .env.example como o exemplo abaixo
$ cp .env.example .env.local

# Adicione suas informacoes nas variaveis de ambiente

GOOGLE_CLIENT_ID= #ID Client do Google OAuth2
GOOGLE_CLIENT_SECRET= #Chave Secreta do Google OAuth2;
NEXT_PUBLIC_SCHEDULE_API= #Adicione a URL do back-end deste repositorio;

#O .env.example esta com variaveis utilizadas para teste em local, caso queira, nao e necessario configurar novamente.
```

## Testes como usuario Admin

Insira o objeto abaixo dentro do array no arquivo "admin.json" para que o mesmo possa ser listado como usuario Admin.

```javascript
{
  "admins": [
    {
      "name": "Nome do usuario",
      "email": "nomeusuario@gmail.com" //Mesmo email usado no Google OAuth, caso contrario nao tera acesso.
    }
  ]
}
```

## Tecnologias Usadas

- [X] NextJS 14
- [X] Next-Auth
- [X] Styled-Components
- [X] NodeJS
- [X] Express

<br/>

Made with 💜 by <a href="https://github.com/trpiano" target="_blank">`Timoteo Reinheimer Piano</a>`

&#xa0;

<a href="#top">`Back to top`</a>
