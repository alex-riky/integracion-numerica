const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const script = html.split('<script>')[1].split('const $=')[0];
const ctx = vm.createContext({});
vm.runInContext(script, ctx);
const f = s => ctx.compileExpression(s);
const I = (s,a,b,n,m) => ctx.integrate(f(s),a,b,n,m).value;
const near=(a,b,t=1e-10)=>assert.ok(Math.abs(a-b)<t, `${a} != ${b}`);
const tests = {
 'Rectángulos de x²: izquierda, derecha, medio':()=>{near(I('x^2',0,2,8,'left'),2.1875);near(I('x^2',0,2,8,'right'),3.1875);near(I('x^2',0,2,8,'mid'),2.65625)},
 'Trapecios de x²':()=>near(I('x^2',0,2,8,'trap'),2.6875),
 'Lineal exacta con trapecios':()=>near(I('3*x+2',-2,4,17,'trap'),30),
 'Convergencia seno':()=>{for(const m of ['mid','trap'])near(I('sin(x)',0,Math.PI,10000,m),2,2e-7)},
 'Límites invertidos':()=>near(I('exp(x)',2,-1,100,'trap'),-I('exp(x)',-1,2,100,'trap')),
 'Intervalo cero':()=>near(I('x^2',3,3,5,'mid'),0),
 'Integral negativa':()=>near(I('-2',0,3,7,'trap'),-6),
 'Cruce del eje':()=>near(I('x',-2,2,19,'mid'),0),
 'Precedencia y exponentes':()=>{near(f('-x^2')(3),-9);near(f('2^3^2')(0),512);near(f('2^-2')(0),.25);near(f('2x+2(x+1)')(3),14);near(f('2pi')(0),2*Math.PI)},
 'Funciones y notación científica':()=>{near(f('sqrt(4)+ln(e)+cos(0)+abs(-2)+1e-3')(0),6.001);near(f('sen(pi/2)')(0),1)},
 'Dominio inválido y singularidad':()=>{assert.throws(()=>I('1/x',-1,1,8,'mid'));assert.throws(()=>I('sqrt(x)',-1,1,8,'trap'));assert.throws(()=>I('exp(1000)',0,1,4,'left'))},
 'Rechazo de código y expresiones incompletas':()=>{for(const s of ['alert(1)','x.constructor','x+','sin(x','x**2','1;2',''])assert.throws(()=>f(s))},
 'Validación de límites y n':()=>{assert.throws(()=>I('x',0,1,0,'mid'));assert.throws(()=>I('x',0,1,1.5,'mid'));assert.throws(()=>I('x',0,Infinity,3,'trap'))}
};
for(const [name,test] of Object.entries(tests)){test();console.log('OK · '+name)}
console.log(Object.keys(tests).length+' grupos de pruebas aprobados.');
