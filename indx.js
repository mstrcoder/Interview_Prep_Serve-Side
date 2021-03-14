class hello{
    constructor(){
        this.best=undefined
        // console.log(this);
    }
    click(){
        console.log(this);
    }
}

const base=new hello();
base.click();