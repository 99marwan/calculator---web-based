const app = Vue.createApp({
    data(){
        return{
            num : '0', //number in screen
            string : '', //expretion
            flag : 0, //arthmetic operator flag
            count : 0, // number of terms
            operationFlag : 0 ,//square,sqrt,percent,negative,one over x flag
            dotFlag : 0,
            errorFlag : 0
        }
    },
    methods: {
        number(string){
              
                if( this.flag == 0 && this.operationFlag == 0 && this.num != '0' && this.errorFlag == 0){
                    if(this.num.length < 18){
                    this.num +=  string
                    }
                }
                else{
                    this.num = string
                    this.flag = 0
                    this.operationFlag = 0
                    this.dotFlag = 0
                    this.errorFlag = 0
                } 
               // console.log(this.num) //check
              //  console.log(this.string) //check
            
        },
        one(){
            this.number('1')
        },
        zero(){
            this.number('0')
        },
        two(){
            this.number('2')
        },
        three(){
            this.number('3')
        },
        four(){
            this.number('4')
        },
        five(){
            this.number('5')
        },
        six(){
            this.number('6')
        },
        seven(){
            this.number('7')
        },
        eight(){
            this.number('8')
        },
        nine(){
            this.number('9')
        },
        dot(){
            if(this.dotFlag == 0){
                if( this.flag == 0 && this.operationFlag == 0 && this.num != '' && this.errorFlag == 0){
                    this.num +=  '.'
                }
                else{
                    this.num = '0'
                    this.num += '.'
                    this.flag = 0
                    this.operationFlag = 0
                    this.errorFlag = 0
                } 
                this.dotFlag = 1
            }
        },
        backSpace(){
            if(this.flag == 0 && this.operationFlag == 0 && this.errorFlag == 0){
                this.num=this.num.substr(0,this.num.length-1)
                if(this.num == ''){
                    this.num = '0'
                }
            }
        },
        clear(){
            this.string =  ''
            this.num = '0'
            this.count = 0
            this.flag = 0
            this.operationFlag = 0
            this.dotFlag = 0
            this.errorFlag = 0
        },
        async equal(){     
           if(this.count == 2){
                this.string += this.num
                await this.addInput(this.string)
                this.flag = 0
                this.string = ''
                this.count = 0
                if(this.num == 'cannot divide by zero' || this.num == 'invalid input'){
                    this.errorFlag = 1
                }
            }
            this.operationFlag = 1
            this.dotFlag = 0
        },
        async arthmeticOperations(string){
            if(this.errorFlag == 0){
                if(this.flag == 1){
                        this.string=this.string.substr(0,this.string.length-1)
                        this.string += string
                        //console.log(this.string) //check
                    }
                    else{
                            this.dotFlag = 0
                            this.string += this.num
                            this.string += string
                           // console.log(this.string) // check
                            this.count += 2
                            this.flag = 1
                            if(this.count > 3){ 
                                await this.addInput(this.string.substr(0,this.string.length-1))
                                let temp =(this.string.substr(this.string.length-1))
                                this.string = (this.num) + (temp)
                                //console.log(this.string) // check
                                this.count = 2
                                if(this.num == 'cannot divide by zero'){
                                    this.errorFlag = 1
                                    this.string = ''
                                    this.count = 0  
                                }
                            }
                           // console.log(this.string) // check
                    }
            }
        },
        async add(){
           await this.arthmeticOperations('+')
        },
        async sub(){
            await this.arthmeticOperations('-')
        },
        async mul(){
            await this.arthmeticOperations('*')
        },
        async div(){
            await this.arthmeticOperations('/')
        },
        async operations(url){
            if(this.errorFlag == 0){
                let response = await fetch(url,{
                    method : 'POST',
                    body : this.num
                });
                if (response.status === 200) {
                    await this.getResult()
                }
                if(this.flag==1){
                    this.flag =0
                }
                this.operationFlag = 1
                if(this.num == 'cannot divide by zero' || this.num == 'invalid input'){
                    this.errorFlag = 1
                    this.string = ''
                    this.count = 0
                }
            }
        },
        async sqr(){
            await this.operations("http://localhost:8080/calc/f3")
        },
        async sqrt(){
            await this.operations("http://localhost:8080/calc/f4")
        },
        async oneOverX(){
            await this.operations("http://localhost:8080/calc/f5")
        },
        async percent(){
            await this.operations("http://localhost:8080/calc/f6")
        },
        async negative(){
            await this.operations("http://localhost:8080/calc/f7")
        },
        async  getResult() {
            let response = await fetch("http://localhost:8080/calc/f1");
            if (response.status === 200) {
                this.num = await response.text()
            }
        },
        async addInput( string) {
            let response = await fetch("http://localhost:8080/calc/f2",{
                method : 'POST',
                body : string
            });
            if (response.status === 200) {
                await this.getResult()
                }
        }
    }
    
})