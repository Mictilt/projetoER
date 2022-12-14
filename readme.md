Título do projeto: FACIL
Tema
O projeto tem como finalidade a criação de uma aplicação para a gestão da mobilidade no concelho de Cinfães.
Será possível através da aplicação pesquisar horários de carreiras, visualizar rotas, adquirir título de transporte e realizar reservas (apenas disponivel para habitantes locais).
Com esta aplicação espera-se que as pessoas localizadas em zonas com pouco acesso a transportes tenham uma alternativa para deslocar ao município onde estão localizados os vários serviços ao público.

Passos de instalação:
1. Descarregar ficheiro grupo-12a-projetoER.rar
2. Extrair os ficheiros para uma pasta.
3. Instalar Node.js link https://nodejs.org/en/
4. Abrir linha comandos navegar até pasta do projeto
5. Executar npm start
6. Deixar janela de linha comandos a executar
7. Abrir Navegador (browser)
8. Na barra de endereços colar o endereço http://localhost:3000/
9. Pressionar enter para ser direcionado(a) para aplicação.

Nota.: a base dados está alojada num servidor externo é necessário ligação a internet para realizar testes ao protótipo.

Utilizadores disponiveis para teste:
Utilizador      pass     Tipo
gestor          123      admin
ana             123      habitante local
emanuelg        123      motorista
visitante       123      visitante

Logo do site é o botão home.
Modificar tipo de utilizador entrar como gestor navegar para utilizador para alterar tipos.

Conta de email para onde são encaminhadas as notificações:
Credencias de acesso
Utilizador: grupo12a.notificacao@gmail.com
Pass: pass1234#
Conta de envio:
Utilizador: grupo12a.er@gmail.com
Pass: pass123#

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
        listar
        criar
        editar
            Classificação
            Comentário
            Data e Hora
        eliminar
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
    Funcionalidade parcial, não tem o ponto de origem onde o utilizador encontra-se. Assume-se que ele está na localização da carreira sobre a qual faz a pesquisa.
7. Reservas
    Funcionalidade completa
8. Rotas
    Contéudo estático não estava entre os requisitos prioritários e não eram essenciais para implementar a restante solução.


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


