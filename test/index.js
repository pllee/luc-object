var ob = require('../index'),
    expect = require('expect.js');
    
describe('Luc Object functions', function() {
    it('each', function() {
        var t = {
            a: 'a',
            b: 'b',
            z: 'z'
        }, obj = {str : ''};

        ob.each(t, function(key, value) {
            this.str += key + value;
        }, obj);
        expect(obj.str).to.eql('aabbzz');
    });

    it('apply', function() {
        var a = {b: 3};
        ob.apply(a, {a: 1, b:2});
        expect(a).to.eql({a: 1, b:2});
        a = {b: 3};
        ob.apply(a, {a: 1});
        expect(a).to.eql({a: 1, b: 3});
        expect(ob.apply({}, undefined)).to.eql({});
        expect(ob.apply(undefined, {})).to.eql({});
    });

    it('mix', function() {
        var a = {b: 3};
        ob.mix(a, {a: 1, b:2});
        expect(a).to.eql({a: 1, b:3});
    });

    it('toObject', function() {
        var a = {},
            b = [],
            toObjectArgs,
            toObjectArray;

        toObjectArray = ob.toObject(['name1', 'name2'], [a,b]);
        expect(toObjectArray.name1).to.eql(a);
        expect(toObjectArray.name2).to.eql(b);

        (function(c,d){
            toObjectArgs = ob.toObject(['name1', 'name2'], arguments);
            expect(toObjectArgs.name1).to.eql(a);
            expect(toObjectArgs.name2).to.eql(b);
        }(a,b));
    });

    it('filter non ownProperties', function() {
        var obj = Object.create({a: 1, b:2}),
            filtered;

        filtered = ob.filter(obj, function(key, value) {
            return key === 'a';
        }, undefined, {
            ownProperties: false
        });

        expect(filtered).to.eql([{key: 'a', value: 1}]);
    });

    it('filter ownProperties', function() {
        var obj = Object.create({a: 1, b:2}),
            filtered;

        obj.c = 3;

        filtered = ob.filter(obj, function(key, value) {
            return key === 'a';
        }, undefined, {
            ownProperties: true
        });

        expect(filtered).to.eql([]);

        filtered = ob.filter(obj, function(key, value) {
            return key === 'c';
        }, undefined, {
            ownProperties: true
        });

        expect(filtered).to.eql([{key: 'c', value: 3}]);
    });

    it('merge', function() {
        var merge = ob.merge;

        expect(merge({}, {a:1})).to.eql({a:1});
        expect(merge({a:false}, {a:1})).to.eql({a:false});
        expect(merge({a:[]}, {a:{a:1}})).to.eql({a:[]});
        expect(merge({a:1,b:2, c:null}, {a:2, b:3, c: {a:[]}})).to.eql({a:1,b:2, c:{a:[]}});
        expect(merge({a:{a:{a:{a:1}}}}, {a:{a:{a:{a:2, b:2}}}})).to.eql({a:{a:{a:{a:1, b:2}}}});
        expect(merge({a:{a:{a:{a:1}}}}, {a:{a:{a:{a:2, b:2}}}})).to.eql({a:{a:{a:{a:1, b:2}}}});
    });
});