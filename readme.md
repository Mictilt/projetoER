Título do projeto: FACIL
Tema
O projeto tem como finalidade a criação de uma aplicação para a gestão da mobilidade no concelho de Cinfães.
Será possível através da aplicação pesquisar horários de carreiras, visualizar rotas, adquirir título de transporte e realizar reservas (apenas disponivel para habitantes locais).
Com esta aplicação espera-se que as pessoas localizadas nem zonas com pouco acesso a transpostes tenham uma alternativa para deslocar ao municipio onde estão localizados os vários serviços ao público.

Passos de instalação:
1. Descarregar ficheiro projetoER.rar
2. Extrar os ficheiros para uma pasta.
3. Instalar Node.js link https://nodejs.org/en/
4. Abir linha comandos navegar até pasta do projeto
5. executar npm start
6. deixar janela de linha comandos a executar
7. Abrir Navegador (browser)
8. Na barra de endereços colar o endereço http://localhost:3000/
9. Pressionar enter para ser direcionado(a) para aplicação. 

## Etapas de implementação

    Carreiras
        listar
        criar
        editar
        eliminar
    Frequências
        listar
        criar
        editar
        eliminar
    Horários
        listar
        criar
        editar
        eliminar
    Titulos de Transporte
        listar
        criar        
        eliminar
        Metodo Pagamento
            selecionar (PAYPAL, MB, MBWAY)
    Reservas

    Utilizador
        Alterar palavra passe do utilizador
        Alterar tipo de utilizador (admin)


 ###Fase desenvolvimento
 O Projeto é um protótipo com algumas funcionalizades implementadas desde a interface de utilizador a várias camadas de arquitetura, modelo de dados.
 Encontra-se implementado:
 1. Autenticação - permite acesso a área pessoal
        O Gestor pode gerir informação:
            Reservas
            Títulos de transporte
            Utilizadores
                alterar tipo
                ?eliminar
            Carreiras
            Horários
            Frequencias
            Pesquisa
            Visualizar rotas
        O Habitante Local:
            Reservas
            Título de Transporte
            Alterar palavra passe                                    
            Pesquisa
            Visualizar rotas
        O Visitante:            
            Título de Transporte
            Alterar palavra passe                                    
            Pesquisa
            Visualizar rotas
2. Carreiras
    Funcionalidade completa
3. Frequências
    Funcionalidade completa
4. Horários
    Funcionalidade completa
5. Títulos de Transporte
    Funcionalidade completa
6. Pesquisas de frequências no município de Cinfães
    Funcionalidade parcial não tem o ponto de origem onde o utilizador encontra-se. Assume-se que ele está na localização da carreira onde sobre a qual fez a pesquisa.
7. Reservas

8. Rotas
    Contéudo estático não estava entre os requisitos prioritarios e não eram essencias para implementar a restante solução.


##Depencias utilizadas:

    "body-parser": "^1.20.0",
    "connect-ensure-login": "^0.1.1",
    "dotenv": "^16.0.0",
    "ejs": "^3.1.7",
    "emoji-picker-element": "^1.11.3",
    "express": "^4.17.1",
    "express-sanitizer": "^1.0.5",
    "express-session": "^1.17.2",
    "mongodb": "^4.5.0",
    "mongoose": "^6.3.1",
    "node-fetch": "^2.6.1",
    "passport": "^0.4.1",
    "passport-local": "^1.0.0",
    "socket.io": "^4.5.0",
    "sync-request": "^6.1.0"

##Depencias Dev:

    "dotenv": "^8.6.0"


