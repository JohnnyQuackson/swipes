const squares = document.querySelector('.squares'), 
      N = squares.children.length,
      squares_classes = ['#s1', '#s2', '#s3'];

squares.style.setProperty('--n', N)

let x1 = null, y1 = null, i = 0, locked = false, lockedy = false;


function unify(event) { return event.changedTouches ? event.changedTouches[0] : event };

function lock(event) {
    x1 =  unify(event).clientX;
    y1 =  unify(event).clientY;

    squares.classList.toggle('smooth', !(locked = true))
    
    document.querySelector(squares_classes[i]).classList.toggle('y-smooth', !(lockedy = false))
};

function drag(event) { 
    event.preventDefault() 
    if (!x1 || !y1) {
        return false;
    }
    if (locked) { squares.style.setProperty('--tx', `${Math.round(unify(event).clientX - x1)}px`) ; }

    document.querySelector(squares_classes[i]).style.setProperty('--ty', `${Math.abs(Math.round(unify(event).clientX - x1))}px`);
    document.querySelector(squares_classes[i]).style.setProperty('--dg', `${(Math.round((unify(event).clientX - x1) / 3.75))}deg`);
};


function move(event) {
    if (locked) {
        if (!x1 || !y1) {
            return false;
        }
        let x2 = unify(event).clientX;
        let y2 = unify(event).clientY;

        let xDiff = x2 - x1;
        let yDiff = y2 - y1;


        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            document.querySelector(squares_classes[i]).style.setProperty('--ty', '0px');
            document.querySelector(squares_classes[i]).classList.toggle('y-smooth', !(lockedy = true));
            
            if((i > 0 || xDiff < 0) && (i < (N - 1) || xDiff > 0))  {
                squares.style.setProperty('--i', i -= Math.sign(xDiff));
            }
            squares.style.setProperty('--tx', '0px');
            squares.classList.toggle('smooth', !(locked = false));
            document.querySelector(squares_classes[i]).classList.toggle('smooth', !(locked = false));
            x1 = null;
            y1 = null;
        }
    }
};


squares.addEventListener('mousemove', drag, false);
squares.addEventListener('touchmove', drag, false);

squares.addEventListener('mousedown', lock, false);
squares.addEventListener('touchstart', lock, false);

squares.addEventListener('mouseup', move, false);
squares.addEventListener('touchend', move, false); 

