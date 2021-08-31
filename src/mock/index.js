import { createServer } from "miragejs";

console.log("MOCK")


createServer({
    routes() {

        this.getList = (list) => {
            let lista = localStorage.getItem(list)
            if (!lista) {
                lista = []
            } else {
                lista = JSON.parse(lista)
            }
            return lista
        }

        this.namespace = "api"

        this.post("/add", (schema, request) => {
            let aluno = JSON.parse(request.requestBody)
            let lista = this.getList("listaDeAlunos")
            lista.push(aluno)
            localStorage.setItem("listaDeAlunos", JSON.stringify(lista))
        })


        this.get("/students", () => {

            // let lista = localStorage.getItem("listaDeAlunos")
            // if (!lista) {
            //     lista = []
            // } else {
            //     lista = JSON.parse(lista)
            // }
            let results = this.getList("listaDeAlunos")
            return { results }

            // return {
            //     results: [
            //         // {
            //         //     id: "1",
            //         //     nome: "Paulo Nakashima",
            //         //     nascimento: "1976-08-19",
            //         //     nomeresponsavel: "Nevine",
            //         //     telresponsavel: "123456789",
            //         //     turma: "123",
            //         //     telemergencia: "123456789",
            //         //     nomeemergencia: "Nevine",
            //         //     restricaoalim: true,
            //         //     descricaorestricao: "maracujá e goiaba",
            //         //     autorizacaofotos: true,
            //         //     listaautorizados: "Nevine",
            //         //     obsadicionais: "Nenhuma",
            //         // },
            //         // {
            //         //     id: "2",
            //         //     nome: "Paulo Nakashima",
            //         //     nascimento: "1976-08-19",
            //         //     nomeresponsavel: "Nevine",
            //         //     telresponsavel: "123456789",
            //         //     turma: "123",
            //         //     telemergencia: "123456789",
            //         //     nomeemergencia: "Nevine",
            //         //     restricaoalim: true,
            //         //     descricaorestricao: "maracujá e goiaba",
            //         //     autorizacaofotos: true,
            //         //     listaautorizados: "Nevine",
            //         //     obsadicionais: "Nenhuma",
            //         // },
            //         // {
            //         //     id: "3",
            //         //     nome: "Paulo Nakashima",
            //         //     nascimento: "1976-08-19",
            //         //     nomeresponsavel: "Nevine",
            //         //     telresponsavel: "123456789",
            //         //     turma: "123",
            //         //     telemergencia: "123456789",
            //         //     nomeemergencia: "Nevine",
            //         //     restricaoalim: true,
            //         //     descricaorestricao: "maracujá e goiaba",
            //         //     autorizacaofotos: true,
            //         //     listaautorizados: "Nevine",
            //         //     obsadicionais: "Nenhuma",
            //         // },
                    // {
                    //     "gender": "male",
                    //     "name": { "title": "Mr", "first": "Todd", "last": "Kennedy" },
                    //     "location": {
                    //         "street": { "number": 5768, "name": "Victoria Road" },
                    //         "city": "Clane",
                    //         "state": "Mayo",
                    //         "country": "Ireland",
                    //         "postcode": 97298,
                    //         "coordinates": { "latitude": "23.3419", "longitude": "-178.0352" },
                    //         "timezone": { "offset": "+3:30", "description": "Tehran" }
                    //     },
                    //     "email": "todd.kennedy@example.com",
                    //     "dob": { "date": "1947-10-22T20:49:00.140Z", "age": 74 },
                    //     "registered": { "date": "2005-01-20T11:18:29.617Z", "age": 16 },
                    //     "phone": "031-475-7513",
                    //     "cell": "081-246-0417",
                    //     "id": { "name": "PPS", "value": "2249991T" },
                    // },
                    // {
                    //     "gender": "male",
                    //     "name": { "title": "Mr", "first": "Oliver", "last": "Polon" },
                    //     "location": {
                    //         "street": { "number": 4916, "name": "Mechelininkatu" },
                    //         "city": "Kaustinen",
                    //         "state": "South Karelia",
                    //         "country": "Finland",
                    //         "postcode": 98212,
                    //         "coordinates": { "latitude": "-36.4603", "longitude": "-28.9358" },
                    //         "timezone": { "offset": "-3:00", "description": "Brazil, Buenos Aires, Georgetown" }
                    //     },
                    //     "email": "oliver.polon@example.com",
                    //     "dob": { "date": "1985-04-25T03:23:12.242Z", "age": 36 },
                    //     "registered": { "date": "2014-02-20T07:20:21.488Z", "age": 7 },
                    //     "phone": "05-631-820", "cell": "042-357-54-77",
                    //     "id": { "name": "HETU", "value": "NaNNA555undefined" },
                    // },
                    // {
                    //     "gender": "male",
                    //     "name": { "title": "Mr", "first": "Diego", "last": "Diez" },
                    //     "location": {
                    //         "street": { "number": 4805, "name": "Calle de Alberto Aguilera" },
                    //         "city": "Orihuela",
                    //         "state": "Navarra",
                    //         "country": "Spain",
                    //         "postcode": 71986,
                    //         "coordinates": { "latitude": "-76.3508", "longitude": "-131.4610" },
                    //         "timezone": { "offset": "-7:00", "description": "Mountain Time (US & Canada)" }
                    //     },
                    //     "email": "diego.diez@example.com",
                    //     "dob": { "date": "1983-09-03T05:10:16.861Z", "age": 38 },
                    //     "registered": { "date": "2018-10-18T01:04:59.212Z", "age": 3 },
                    //     "phone": "926-675-132",
                    //     "cell": "694-592-838",
                    //     "id": { "name": "DNI", "value": "50250566-P" },
                    // },
                    // {
                    //     "gender": "male",
                    //     "name": { "title": "Mr", "first": "Adrian", "last": "Perez" },
                    //     "location": {
                    //         "street": { "number": 4421, "name": "Mill Road" },
                    //         "city": "Newcastle upon Tyne",
                    //         "state": "County Armagh",
                    //         "country": "United Kingdom",
                    //         "postcode": "N5 1HB",
                    //         "coordinates": { "latitude": "33.9734", "longitude": "-160.7172" },
                    //         "timezone": { "offset": "+2:00", "description": "Kaliningrad, South Africa" }
                    //     },
                    //     "email": "adrian.perez@example.com",
                    //     "dob": { "date": "1997-10-18T04:41:27.077Z", "age": 24 },
                    //     "registered": { "date": "2006-08-18T08:38:53.684Z", "age": 15 },
                    //     "phone": "01426 831650",
                    //     "cell": "0757-523-063",
                    //     "id": { "name": "NINO", "value": "XW 77 24 97 I" },
                    // },
                    // {
                    //     "gender": "male",
                    //     "name": { "title": "Mr", "first": "Willie", "last": "Wade" },
                    //     "location": {
                    //         "street": { "number": 5274, "name": "Cackson St" },
                    //         "city": "Forney",
                    //         "state": "Virginia",
                    //         "country": "United States",
                    //         "postcode": 11665,
                    //         "coordinates": { "latitude": "-78.1227", "longitude": "-102.2758" },
                    //         "timezone": { "offset": "+11:00", "description": "Magadan, Solomon Islands, New Caledonia" }
                    //     },
                    //     "email": "willie.wade@example.com",
                    //     "dob": { "date": "1961-02-02T01:06:47.653Z", "age": 60 },
                    //     "registered": { "date": "2009-07-29T20:15:47.984Z", "age": 12 },
                    //     "phone": "(651)-498-2424", "cell": "(086)-670-3970",
                    //     "id": { "name": "SSN", "value": "022-59-0726" },
                    // }
            //     ]
            // }
        })
    }
})