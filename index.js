const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Restaurant found: Kempinski", image: "images/shoyu.jpeg", rating: 5, comment: "Rich umami flavor with perfectly cooked noodles!" },
    { id: 2, name: "Miso Ramen", restaurant: "Restaurant found: JW marriot", image: "images/miso.jpeg", rating: 4, comment: "Savory and hearty, great on a cold day." },
    { id: 3, name: "Tonkotsu Ramen", restaurant: " Restaurant found: Hilton", image: "images/Tonkotsu.jpeg", rating: 3, comment: "Creamy pork broth that's been simmered for hours." },
    { id: 4, name: "Kojiro Ramen", restaurant: "Restaurant found: Windsor", image: "images/Kojiro.jpeg", rating: 2, comment: "a unique style of ramen characterized by its spicy blend that combines chicken and seafood broth"}
  ];
  
  let selectedRamen = null;
  
  // Display of ramen images

  function displayRamens() {
    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.innerHTML = '';
    
    ramens.forEach(ramen => {
      const ramenCard = document.createElement('div');
      ramenCard.className = 'ramen-card';
      
      if (selectedRamen && selectedRamen.id === ramen.id) {
        ramenCard.classList.add('selected');
      }
      
      ramenCard.innerHTML = `
        <img src="${ramen.image}" alt="${ramen.name}">
        <div class="ramen-card-info">
          <h3 class="ramen-card-title">${ramen.name}</h3>
          <p class="ramen-card-restaurant">${ramen.restaurant}</p>
        </div>
      `;
      
      ramenCard.addEventListener('click', () => {
        handleClick(ramen);
      });
      
      ramenMenu.appendChild(ramenCard);
    });
  }
  
  // handling of the ramen click


  function handleClick(ramen) {
    selectedRamen = ramen;
    displayRamenDetail(ramen);
    
  
    document.querySelectorAll('.ramen-card').forEach(card => {
      card.classList.remove('selected');
    });
    
    document.querySelectorAll('.ramen-card').forEach(card => {
      const cardTitle = card.querySelector('.ramen-card-title').textContent;
      const cardRestaurant = card.querySelector('.ramen-card-restaurant').textContent;
      
      if (cardTitle === ramen.name && cardRestaurant === ramen.restaurant) {
        card.classList.add('selected');
      }
    });
  }
  
  // Display ramen details
  function displayRamenDetail(ramen) {
    const ramenDetail = document.getElementById('ramen-detail');
    
    const starsHTML = createStarRating(ramen.rating);
    
    ramenDetail.innerHTML = `
      <div class="detail-header">
        <h2 class="detail-card-title">${ramen.name}</h2>
        <p class="detail-card-restaurant">${ramen.restaurant}</p>
        <div class="detail-actions">
          <button class="edit-btn">✏️</button>
          <button class="delete-btn">🗑️</button>
        </div>
      </div>
      
      <img src="${ramen.image}" alt="${ramen.name}" class="detail-card-image">
      
      <div class="detail-section">
        <p class="detail-section-title">Rating</p>
        <div class="star-rating">${starsHTML}</div>
      </div>
      
      <div class="detail-section">
        <p class="detail-section-title">Comments</p>
        <p class="detail-comment">${ramen.comment || 'No comments yet.'}</p>
      </div>
    `;
    
    // Add event listeners for editing and deleting
    const editBtn = ramenDetail.querySelector('.edit-btn');
    const deleteBtn = ramenDetail.querySelector('.delete-btn');
    
    editBtn.addEventListener('click', () => {
      toggleEditMode(ramen);
    });
    
    deleteBtn.addEventListener('click', () => {
      deleteRamen(ramen.id);
    });
  }
  
  // Create star rating function
  function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    return stars;
  }
  
  
  function toggleEditMode(ramen) {
    const detailComment = document.querySelector('.detail-comment');
    const starRating = document.querySelector('.star-rating');
    const editBtn = document.querySelector('.edit-btn');
    
    if (detailComment.contentEditable === 'true') {
      detailComment.contentEditable = 'false';
      detailComment.classList.remove('editable');
      
      
      const newComment = detailComment.textContent;
      updateRamen(ramen.id, { comment: newComment });
      
      editBtn.textContent = '✏️';
    } else {
      
      detailComment.contentEditable = 'true';
      detailComment.classList.add('editable');
      detailComment.focus();
      
      // Making the  stars clickable
      const stars = starRating.textContent.split('');
      starRating.innerHTML = '';
      
      stars.forEach((star, index) => {
        const starSpan = document.createElement('span');
        starSpan.textContent = star;
        starSpan.style.cursor = 'pointer';
        
        starSpan.addEventListener('click', () => {
          updateRamen(ramen.id, { rating: index + 1 });
          displayRamenDetail(selectedRamen);
        });
        
        starRating.appendChild(starSpan);
      });
      
      editBtn.textContent = '✓';
    }
  }
  
//updating the ramen
  function updateRamen(id, updates) {
    const index = ramens.findIndex(r => r.id === id);
    if (index !== -1) {
      ramens[index] = { ...ramens[index], ...updates };
      
      if (selectedRamen && selectedRamen.id === id) {
        selectedRamen = ramens[index];
      }
      
      displayRamens();
    }
  }
  
  
  function deleteRamen(id) {
    const index = ramens.findIndex(r => r.id === id);
    if (index !== -1) {
      ramens.splice(index, 1);
      
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      } else {
        const ramenDetail = document.getElementById('ramen-detail');
        ramenDetail.innerHTML = `
          <div class="empty-state">
            <p>No ramens available. Kindly Add one!</p>
          </div>
        `;
      }
      
      displayRamens();
    }
  }
  
 
    function addSubmitListener() {
      const newRamenForm = document.getElementById('new-ramen-form');
      
      newRamenForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formElements = {
          name: document.getElementById('name'),
          restaurant: document.getElementById('restaurant'),
          image: document.getElementById('image'),
          rating: document.getElementById('rating'),
          comment: document.getElementById('comment')
        };
        
        
        const newRamen = {
          id: generateUniqueId(),
          name: formElements.name.value,
          restaurant: formElements.restaurant.value,
          image: formElements.image.value,
          rating: Number(formElements.rating.value) || 0,
          comment: formElements.comment.value
        };
        
        
        addRamenToCollection(newRamen, false);
        
        
        newRamenForm.reset();
      });
    }

    
    function generateUniqueId() {
      return Math.max(0, ...ramens.map(r => r.id)) + 1;
    }
    
    
    function addRamenToCollection(ramen, selectAfterAdd = true) {
      ramens.push(ramen);
      displayRamens();
      
      if (selectAfterAdd) {
        handleClick(ramen);
      }
    }
  //main function
  function main() {
    displayRamens();
    addSubmitListener();
    
  
    if (ramens.length > 0) {
      handleClick(ramens[0]);
    }
  }
  
  
  document.addEventListener('DOMContentLoaded', main);
  