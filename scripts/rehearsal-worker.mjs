// Executes operator-supplied fixtures in a disposable in-memory database only.
import {PGlite} from '@electric-sql/pglite';
let input='';for await(const chunk of process.stdin) input+=chunk;
const spec=JSON.parse(input);const db=new PGlite();let stage='baseline';
try{
 await db.exec(spec.baseline);stage='forward';await db.exec(spec.forward);stage='verify';
 const assertion=async sql=>{const {rows}=await db.query(sql);if(rows.length!==1||Object.keys(rows[0]).length!==1||rows[0].ok!==true)throw Error('Assertion must return exactly one boolean column named ok with true');};
 await assertion(spec.verify);stage='rollback';await db.exec(spec.rollback);stage='verify_rollback';await assertion(spec.verify_rollback);
 console.log(JSON.stringify({passed:true,stages:['baseline','forward','verify','rollback','verify_rollback'],engine:'PGlite',scope:'Supplied fixture only; no production connection'}));
}catch(e){console.log(JSON.stringify({passed:false,stage,error:e.message}));}finally{await db.close();}
