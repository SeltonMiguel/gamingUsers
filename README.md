Tutorial: Ao clonar e preparar o ambiente rode o comando | npm run start:dev | na aplicação save_data, a partir disso ela irá se auto inicializar e ao concluir também inicializará o catch_data automaticamente.

Aplicações estruturadas com padrão DDD e e SOLID visando organização e flexibilidade com os seguinte objetivos:

Aplicação 1 ( catch_data ):
Realizar a leitura e manusear os dados dos arquivos csv.
Aplicação 2 ( save_data ):
Receber os dados tratados na aplicação 1 e inserir no banco de dados. 

Fluxo:
Ao iniciar a aplicação Save Data ( aplicação 2 ) será iniciado o servidor e a api estará apta a receber via http axios os dados da Catch Data ( aplicação 1 ) a qual será executada 
automaticamente assim que a aplicação 2 for iniciada e estiver preparada.

![image](https://github.com/user-attachments/assets/8bf7d094-ea5b-4847-ba03-45e30ddefd61)

![image](https://github.com/user-attachments/assets/861ba27a-5e8a-4cbc-8f14-5c62533e2e05)

read.me interno do projeto com mais detalhes.
