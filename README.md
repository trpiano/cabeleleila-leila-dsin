<h1 align="center">
   Desafio Cabeleleila Leila - DSION

<br>
<h3 align="center">

<br>
</h3>
</h1>

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
