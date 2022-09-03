class Foo{
    setter = ''
}
test('', ()=>{
    const foo = {setter: ''}
    console.log(foo instanceof Foo)
})