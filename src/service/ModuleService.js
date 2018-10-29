let _singleton = Symbol();
const MODULE_API_URL="http://localhost:8080/api/course/CID/module";
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }
    createModule(courseId,module){
        return fetch(MODULE_API_URL.replace('CID',courseId),{
            body:JSON.stringify(module),
            headers:{
                'Content-Type':'application/json'
            },
            method:'POST'
        })
            .then((response)=>response.json());
    }
}