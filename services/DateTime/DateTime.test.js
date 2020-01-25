import {appendZero} from './DateTime';

describe('Append zeros to date fragments', () => {

    it('should return the same number', () => {
        expect(appendZero('12')).toBe('12');
    });

    it('should add a zero before the initial number', () => {
        expect(appendZero('3')).toBe('03');
    });
});
