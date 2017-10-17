var expect = require('expect');

var {generateMessage}= require('./message');

describe('generateMessage', ()=>{
    it('should generate the correct message object', ()=>{
        var from = 'Yegeong';
        var text='Some message';
        var message =generateMessage(from, text);

        expect(message).toMatchObject({
          from,
          text
        });
        expect(typeof message.createdAt).toBe('number')
        //store res in variable
        //assert from match
        //assert text match up
        //assert createdAt is number
    });
});