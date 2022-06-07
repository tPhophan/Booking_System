const containerEl = document.querySelector('.container');
const movieSelectEl = document.querySelector('#movie-select');
const seatsEl = document.querySelectorAll('.row .seat');
const countTextEl = document.querySelector('#count');
const totalTextEl = document.querySelector('#total');

let price = +movieSelectEl.value;

movieSelectEl.addEventListener('change', e =>{
    price = +e.target.value;
    ft_updateSelected();
    ft_setMovieData(e.target.selectedIndex, +e.target.value);
});

containerEl.addEventListener('click', e =>{
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        ft_updateSelected();
    }
});

function ft_updateSelected(){
    const selectedSeat = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeat].map(seat=>[...seatsEl].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    countTextEl.innerText = selectedSeat.length;
    totalTextEl.innerText = selectedSeat.length * price;
}

function ft_setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

function ft_showDataToUI(){
    const selectSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    seatsEl.forEach((seat, index)=>{
        if (selectSeats.indexOf(index) > -1){
            seat.classList.add('selected');
        }
    });
    const selectMovieIndex = localStorage.getItem('movieIndex');
    movieSelectEl.selectedIndex = selectMovieIndex;
}

ft_showDataToUI();
ft_updateSelected();