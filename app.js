
class black_jack{
    cards = [
        'A-H','2-H','3-H','4-H','5-H','6-H','7-H','8-H','9-H','10-H','J-H','Q-H','K-H',
        'A-D','2-D','3-D','4-D','5-D','6-D','7-D','8-D','9-D','10-D','J-D','Q-D','K-D',               
        'A-S','2-S','3-S','4-S','5-S','6-S','7-S','8-S','9-S','10-S','J-S','Q-S','K-S',              
        'A-C','2-C','3-C','4-C','5-C','6-C','7-C','8-C','9-C','10-C','J-C','Q-C','K-C']
    player_score = 0
    computer_score=0
    computer_hand = []
    player_hand = []
    constructor(){
        //shuffle cards
        this.cards.sort(()=>Math.random()-0.5)
       
        this.computer_hit()
        this.computer_hit()
        this.player_hit()
        this.player_hit()
        this.check_blackjack()
         
    }
    computer_hit(){
        var card = this.cards[Math.floor(Math.random()*this.cards.length)]
        this.computer_hand.push(card)
        var Image = `<div class="g"><img src="cards/${card}.png" class = "${card}"></div>` 
        $('.computer .hand').append(Image)
        this.evaluate_score()
    }


    player_hit(){
        var card = this.cards[Math.floor(Math.random()*this.cards.length)]
        this.player_hand.push(card)
        var Image = `<div class="g"><img src="cards/${card}.png" class = "${card}"></div>`
        $('.player .hand').append(Image)
        this.evaluate_score()
        if (this.player_score == 21){
            this.player_stand()
        }
    
    }   


    async player_stand(){
        $('.hit').css('display','none')
        $('.stand').css('display','none')
        while (this.computer_score <17){
           this.computer_hit()
           await new Promise(resolve => setTimeout(resolve, 1000));
        }
        if (this.computer_score >21){
            this.win()
          }
          
      
        else{
            if (this.computer_score>this.player_score){
                this.lose()
            }
            else if (this.computer_score<this.player_score){
                this.win()   
            }
            else{
                this.draw()
                
            }
        }
    }


    check_bust(){
        if (this.player_score > 21){
          
            if (this.ace_count(this.player_hand) > 0){
                let count =  this.ace_count(this.player_hand)
                while (count >0){
                    this.player_score-=10
                    count-=1
                    if (this.player_score <=21){
                        $('.player .score').text(this.player_score)
                        return
                    }
                }
            }
            this.lose()
        }
        if (this.computer_score > 21){
            if (this.ace_count(this.computer_hand) > 0){
                let count =  this.ace_count(this.computer_hand)
                while (count >0){
                    this.computer_score-=10
                    count-=1
                    if (this.computer_score <=21){
                        $('.computer .score').text(this.computer_score)
                        return
                    }
                }
            }
            this.win()
        }
        
    } 


    check_blackjack(){
        if (this.player_score ==21 && this.computer_score ==21){
            this.draw()
            return
        }
        else{
            if (this.player_score ==21){
                this.win()
            }
            else if(this.computer_score==21){
                this.lose()
            }
        }
    }
    
    
    evaluate_score(){
        this.player_score = 0
        this.computer_score = 0
        
        for (let card in this.computer_hand){
            let hand = this.computer_hand[card].split('-')[0]
            if (hand== 'A'){
                if ((this.computer_score + 11 )>21){
                    if (this.computer_hand.length == 2){
                        this.computer_score+=10
                        continue
                    }
                }
                this.computer_score+=11   
            } 
            else if (hand == 'J' || hand == 'Q' || hand == 'K'){
                this.computer_score+=10
            }
            else{
                this.computer_score+=parseInt(hand)
            }
        }
        for (let card in this.player_hand){
            let hand = this.player_hand[card].split('-')[0]
            if (hand == 'A'){
                if (hand == 'A'){
                    
                    if ((this.player_score + 11 )>21){
                        if (this.player_hand.length == 2){
                            this.player_score+=10
                            continue
                        }
                    }
                    this.player_score+=11
                    
                } 
            } 
            else if (hand == 'J' || hand == 'Q' || hand == 'K'){
                this.player_score+=10
            }
            else{
                this.player_score+=parseInt(hand)
            }
        }
        this.check_bust()
        if (this.player_hand.length == 2 && this.computer_hand.length == 2){
            
            this.check_blackjack()
        }
        $('.player .score').text(this.player_score)
        $('.computer .score').text(this.computer_score)
    }


    ace_count(cards){
        let count =0
        for (let card in cards){
            if (cards[card].split('-')[0] == 'A'){
                count+=1
            }
        }
        return count

    }

    win(){
        $('#winSound')[0].play()
        $('.result').text('You win!')
        $('.hit').css('display','none')
        $('.stand').css('display','none')
        $('.result').css('display','block')
    }


    draw(){
        $('.result').text('DRAW')
        $('.result').css('display','block') 
        $('.hit').css('display','none')
        $('.stand').css('display','none')
    }


    lose(){
        $('#lossSound')[0].play()
        $('.result').text('You Lose!')
        $('.hit').css('display','none')
        $('.stand').css('display','none')
        $('.result').css('display','block')
    }
}


game = new black_jack()

$('.hit').click(function(){ 
    game.player_hit()
})
$('.stand').click(function(){
    game.player_stand()
})

$('#button').click(function(){
    document.location.reload();
})
