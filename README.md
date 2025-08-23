# 🚀 Guia Rápido: Decision AI 🚀

Este guia mostra como baixar o projeto da aula, configurar seu banco de dados e enviá-lo para seu próprio repositório no GitHub.

---

### Passo 1: Clone o Repositório da Aula

No seu terminal, execute o comando `git clone` para baixar o projeto. 

```bash
git clone https://github.com/user/decision-ai.git

# Entre na pasta do projeto pelo terminal do VS Code
cd decision-ai
```

### Passo 2: Desvincule o Projeto e Inicie Seu Repositório

Vamos transformar essa pasta em um projeto seu.

1.  **Apague o histórico do repositório original**:
    ```bash
    # No macOS/Linux
    rm -rf .git
    
    # No Windows (PowerShell/Git Bash)
    rm -r -force .git
    ```

2.  **Inicie seu próprio repositório Git**:
    ```bash
    git init
    ```

### Passo 3: Crie e Conecte Seu Repositório no GitHub

1.  **Crie um novo repositório, vazio, na sua conta do GitHub**.
    *   Dê o nome que preferir.
    *   Deixe-o como **Público**.

2.  **Conecte seu código local ao repositório do GitHub**. Copie a URL do seu novo repositório e use no comando abaixo:
    ```bash
    git remote add origin <URL_DO_SEU_NOVO_REPO>
    ```

### Passo 4: Instale as Dependências e Configure o Banco

1.  **Instale os pacotes necessários**:
    ```bash
    npm install
    ```

2.  **Configure a conexão com o banco de dados**:
    *   Crie um arquivo na raiz do projeto chamado `.env`.
    *   Pegue a **URL de conexão** do seu banco de dados no site do NeonDB.
    *   Abra o arquivo `.env` e adicione a linha abaixo, colando a sua URL:
    ```
    DATABASE_URL="sua-url-de-conexao-do-neon-aqui"
    ```

### Passo 5: Crie as Tabelas e Rode o Projeto

1.  **Execute o Prisma para criar as tabelas** no seu banco de dados Neon. No terminal do VS Code:
    ```bash
    npx prisma migrate dev
    ```
    *(Dê um nome qualquer para a migration quando for solicitado, como "setup-inicial")*

2.  **Inicie o projeto** para ver se tudo funciona:
    ```bash
    npm run start:dev
    ```

### Passo 6: Envie o Projeto para o Seu GitHub

Agora, envie o código configurado para o seu repositório.

1.  **Adicione todos os arquivos**:
    ```bash
    git add .
    ```

2.  **Faça o commit inicial**:
    ```bash
    git commit -m "Configuração inicial do projeto"
    ```

3.  **Envie para o seu repositório no GitHub**:
    ```bash
    git push -u origin main
    ```

---

 **Pronto!** 

Seu projeto está configurado e salvo no seu GitHub. Bom trabalho!