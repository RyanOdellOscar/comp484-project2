$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.attack-button').click(clickedAttackButton);
    $('.name-input').change(function() {
      current_pet = new Pet($('.name-input').val() || "Pet");
      if(number_of_pets >= 6) {
        index = replace_pet(current_pet);
        document.getElementById("pet-comment").innerHTML = current_pet.name + "has been added. " + pet_array[index].name + " has been removed.";
      }
      else{index = number_of_pets;
        number_of_pets++;
      }
      pet_array[index] = current_pet;
      pet_info = current_pet;
      checkAndUpdatePetInfoInHtml();
    });
  

  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    pet_array = new Array(6);
    var number_of_pets = 0;
    var punching_bag_health = 100;
    var bag_level = 1;
    // Hide punching bag until attack button is clicked
    $('.punching-bag-image').hide();
    var pet_info = {name: $('.name-input').val() || "Pet", weight:1, happiness:0 };

    //pet contructor function
    function Pet(name) {
      this.name = name;
      this.weight = 1
      this.happiness = 0;
    }
  
    function clickedTreatButton() {
      // Increase pet happiness
      // Increase pet weight
      pet_info.happiness += 1;
      pet_info.weight += 0.5;
      //comment from pet
      document.getElementById("pet-comment").innerHTML = "Yummy! I love treats!";

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      // Decrease pet weight
      pet_info.happiness += 1;
      pet_info.weight -= 0.5;
      //comment from pet
      document.getElementById("pet-comment").innerHTML = "I had so much fun playing!";

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      // Decrease pet weight
      pet_info.happiness -= 1;
      pet_info.weight -= 2;
      //comment from pet
      document.getElementById("pet-comment").innerHTML = "I'm getting tired from all that exercise!";

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
        alert("Your pet is too skinny! Please feed it some treats.");
      }
      // Add conditional so if happiness is lower than zero.
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
        alert("Your pet is sad! Please play with it.");
      }

      if(pet_info.happiness <= 0 && pet_info.weight == 0) {
        alert(pet_info.name + " has fainted! Resetting pet info...");
        pet_info.happiness = 0;
        pet_info.weight = 1;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }

    function clickedAttackButton() {
      // calculates attack power with weight and happyness
      var attack_power = Math.floor((pet_info.happiness / pet_info.weight) * 10);
      $('.punching-bag-image').slideDown("slow", function(){
        document.getElementById("pet-comment").innerHTML = "level " + bag_level + " punching bag has appeared! ";
        document.getElementById("pet-comment").innerHTML += pet_info.name + " dealt " + attack_power + " damage!";
      });
      punching_bag_health -= attack_power;
      if(punching_bag_health <= 0) {
        setTimeout(() => {
          $('.punching-bag-image').slideUp("slow", function(){
          document.getElementById("pet-comment").innerHTML = "defeated level " + bag_level + " punching bag!";
          bag_level += 1;
          punching_bag_health = 100 * bag_level;
        });
        }, 2000);
        
      } else {
        setTimeout(function() {
          document.getElementById("pet-comment").innerHTML = "punching bag has " + punching_bag_health + " health left!";
        }, 2000);
      }
    }

    function replace_pet(new_pet) {
      var index = prompt("please select a pet to replace: " + pet_array[0].name + ", " + pet_array[1].name + ", " + pet_array[2].name + ", " + pet_array[3].name + ", " + pet_array[4].name + ", " + pet_array[5].name);
      if(index < 0 || index > 5) {
        alert("invalid index, replacing pet 0 by default");
        return 0;
      }
      return index;
    }

    function show_all_pets() {
      var pet_list = "Your pets: ";
      for(var i = 0; i < number_of_pets; i++) {
        pet_list += pet_array[i].name + " ";
      }
      alert(pet_list);
    }

  