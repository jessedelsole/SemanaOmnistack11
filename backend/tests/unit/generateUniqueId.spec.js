const generateUniqueId = require('../../src/utils/gererateUniqueId');

describe('generate Unique ID', ()=> {
    it('should generate an unique ID', ()=> {

        const id = generateUniqueId();
        //expect(2+2).toBe(4)
        expect(id).toHaveLength(8)

    })
})