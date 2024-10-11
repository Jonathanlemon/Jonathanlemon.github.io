export class Tag{

    
static readonly ANGULAR = new Tag('Angular', 'red');
static readonly CSHARP = new Tag('C#', 'blue');
static readonly C = new Tag('C', 'blue');
static readonly CPLUSPLUS = new Tag('C++', 'blue');
static readonly PYTHON = new Tag('Python', 'green');
static readonly SQL = new Tag('SQL', 'purple');
static readonly PERL = new Tag('PERL', 'red');
static readonly PHP = new Tag('PHP', 'purple');
static readonly NODEJS = new Tag('NodeJS', 'pink');
static readonly SHELL = new Tag('Shell', "orange")
static readonly HTML = new Tag('HTML', "red")
static readonly JAVA = new Tag('Java', "pink")


    public name: string;
    public color: string;

    constructor(key: string, c: string){
        this.name=key;
        this.color=c;
    }

    toString(){
        return this.name;
    }
}
