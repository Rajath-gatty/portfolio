var TerminalEmulator = {
    init: function(screen) {
      var inst = Object.create(this);
      inst.screen = screen;
      inst.createInput();
      
      return inst;
    },
  
    createInput: function() {
      var inputField = document.createElement('div');
      var inputWrap = document.createElement('div');
      
      inputField.className = 'terminal_emulator__field';
      inputField.innerHTML = '';
      inputWrap.appendChild(inputField);
      this.screen.appendChild(inputWrap);
      this.field = inputField;
      this.fieldwrap = inputWrap;
    },
  
  
    enterInput: function(input) {
      return new Promise( (resolve, reject) => {
      var randomSpeed = (max, min) => { 
        return Math.random() * (max - min) + min; 
      }
        
      var speed = randomSpeed(70, 90);
      var i = 0;
      var str = '';
      var type = () => {
        
        str = str + input[i];
        this.field.innerHTML = str.replace(/ /g, '&nbsp;');
        i++;
        
        setTimeout( () => {
          if( i < input.length){
            if( i % 5 === 0) speed = randomSpeed(80, 120);
            type();
          }else {
            setTimeout( () => {
              resolve();
            }, 400);
            
          } 
        }, speed);
        
        
      };
      
      
      type();
        
      });
    },
    
    enterCommand: function() {
      return new Promise( (resolve, reject ) => {
        var resp = document.createElement('div');
        resp.className = 'terminal_emulator__command';
        resp.innerHTML = this.field.innerHTML;
        this.screen.insertBefore( resp, this.fieldwrap);
        
        this.field.innerHTML = '';
        resolve();
      })
    },
  
    enterResponse: function(response) {
      
      return new Promise( (resolve, reject ) => {
        var resp = document.createElement('div');
        resp.className = 'terminal_emulator__response';
        resp.innerHTML = response;
        this.screen.insertBefore( resp, this.fieldwrap);
        
        resolve();
      })
    },
    
    wait : function( time, busy ) {
      busy = (busy === undefined ) ? true : busy;
      return new Promise( (resolve, reject) => {
         if (busy){
           this.field.classList.add('waiting');
         } else {
           this.field.classList.remove('waiting');
         }
         setTimeout( () => {
            resolve();
        }, time);
      });
    },
    
    reset : function() {
      return new Promise( (resolve, reject) => {
        this.field.classList.remove('waiting');
        resolve();
      });
    }
  
  };
  
  
  /*
   * 
   * This is where the magic happens
   *
   */ 
  
  
  var TE = TerminalEmulator.init(document.getElementById('screen'));
  
  
  TE.wait(1000, false)
    .then( TE.enterInput.bind(TE, 'Hello!') )
    .then( TE.enterCommand.bind( TE ) ) 
    .then( TE.enterInput.bind(TE, 'I\'m Rajath') )
    .then( TE.enterCommand.bind( TE ) ) 
    .then( TE.wait.bind(TE, 1000) )
    .then( TE.enterResponse.bind(TE, '- I\'m a fullstack web developer') )
    .then( TE.enterInput.bind(TE, 'Frontend technologies i use') )
    .then( TE.enterCommand.bind( TE ) ) 
    .then( TE.wait.bind(TE, 1000) )
    .then( TE.enterResponse.bind(TE, '-   HTML, CSS, Javascript, React.js, Next.js, typescript') )
    .then( TE.enterInput.bind(TE, 'Backend technologies') )
    .then( TE.enterCommand.bind( TE ) ) 
    .then( TE.wait.bind(TE, 1000) )
    .then( TE.enterResponse.bind(TE, '-   Node.js, Express.js, Mysql, MongoDB') )
    .then( TE.wait.bind(TE, 700) )
