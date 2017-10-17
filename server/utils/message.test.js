var expect = require('expect');

var {generateMessage, generateLocationMessage}= require('./message');

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
    });
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Yegeong';
        var latitude = 37.404778199999996;
        var longitude=127.10611979999999;
        var message=generateLocationMessage(from, latitude, longitude)

        expect(message).toMatchObject({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(typeof message.createdAt).toBe('number')
    })
});