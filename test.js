const testSuites = [];
let currentTestResults = [];

function sum(a,b){ 
    return a+b;
}

function describe(description,testSuite){
    testSuites.push({ description, testSuite });
}

function it(description,testCase){
    try{
        testCase();
        currentTestResults.push({description, passed:true});
    }catch(e){
        currentTestResults.push({description, passed:false, error:e});
    }
}

function runTests(){
    const results = [];
    testSuites.forEach( ({description:suiteDescription, testSuite}) =>{
        currentTestResults=[];
        testSuite();
        const suiteResults = {suiteDescription, tests:currentTestResults};
       
        results.push(suiteResults);
    });

    //report results
    results.forEach(({suiteDescription, tests}) => {
        console.log('test suite: ', suiteDescription);
        tests.forEach((test, index)=>{
            console.log(`test ${index + 1}: ${test.description} - ${test.passed ? 'passed':'failed'}`)
        })
    })
}
function expect(actual, expected){
    return {
        toBe(expected){
            if(actual === expected){
                return true;
            }else{
                throw new Error(`${actual} is not equal to ${expected}`);
            }
        },
        toEqual(expected){
            if(actual === expected){
                return true;
            }else{
                throw new Error(`${actual} is not equal to ${expected}`);
            }
        }
    }
}

describe('example suite', ()=>{
    it('sum of two numbers',()=>{
        expect(sum(1,1)).toBe(2);
    })
});

runTests();