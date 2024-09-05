export class Tag{

    
static readonly ANGULAR = new Tag('Angular', 'red');
static readonly CSHARP = new Tag('C#', 'blue');
static readonly CPLUSPLUS = new Tag('C++', 'darkorange');
static readonly PYTHON = new Tag('Python', 'green');
static readonly SQL = new Tag('SQL', 'purple');
static readonly PERL = new Tag('PERL', 'gray');
static readonly PHP = new Tag('PHP', 'gold');
static readonly NODEJS = new Tag('NodeJS', 'silver');
static readonly SHELL = new Tag('Shell', "Orange")
static readonly HTML = new Tag('HTML', "darkred")
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
