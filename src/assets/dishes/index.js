import greek_salad from "./greek-salad.jpg";
import veg_salad from "./veg-salad.jpg";
import clover_salad from "./clover-salad.jpg";
import chicken_salad from "./chicken-salad.jpg";
import lasagna_rolls from "./lasagna-rolls.jpg";
import peri_peri_rolls from "./peri-peri-rolls.jpg";
import chicken_rolls from "./chicken-rolls.jpg";
import veg_rolls from "./veg-rolls.jpg";
import ripple_ice_cream from "./ripple-ice-cream.jpg";
import fruit_ice_cream from "./fruit-ice-cream.jpg";
import jar_ice_cream from "./jar-ice-cream.jpg";
import vanilla_ice_cream from "./vanilla-ice-cream.jpg";
import chicken_sandwich from "./chicken-sandwich.jpg";
import vegan_sandwich from "./vegan-sandwich.jpg";
import grilled_sandwich from "./grilled-sandwich.jpg";
import bombay_sandwich from "./bombay-sandwich.jpg";
import cup_cake from "./cup-cake.jpg";
import vegan_cake from "./vegan-cake.jpg";
import butterscotch_cake from "./butterscotch-cake.jpg";
import red_velvet_cake from "./red-velvet-cake.jpg";
import garlic_mushroom from "./garlic-mushroom.jpg";
import gobi_65 from "./gobi-65.jpg";
import veg_pulao from "./veg-pulao.jpg";
import paneer_butter_masala from "./paneer-butter-masala.jpg";
import cheese_pasta from "./cheese-pasta.jpg";

// Original photos, kept until AI replacements are generated.
import bread_sandwich from "../frontend_assets/food_16.png";
import sliced_cake from "../frontend_assets/food_20.png";
import rice_zucchini from "../frontend_assets/food_24.png";
import tomato_pasta from "../frontend_assets/food_26.png";
import creamy_pasta from "../frontend_assets/food_27.png";
import chicken_pasta from "../frontend_assets/food_28.png";
import butter_noodles from "../frontend_assets/food_29.png";
import veg_noodles from "../frontend_assets/food_30.png";
import somen_noodles from "../frontend_assets/food_31.png";
import cooked_noodles from "../frontend_assets/food_32.png";

export const menu_list = [
  { menu_name: "Salad", menu_image: greek_salad },
  { menu_name: "Rolls", menu_image: chicken_rolls },
  { menu_name: "Desserts", menu_image: ripple_ice_cream },
  { menu_name: "Sandwich", menu_image: chicken_sandwich },
  { menu_name: "Cake", menu_image: red_velvet_cake },
  { menu_name: "Pure Veg", menu_image: paneer_butter_masala },
  { menu_name: "Pasta", menu_image: cheese_pasta },
  { menu_name: "Noodles", menu_image: veg_noodles },
];

// _id values 1-32 match the original catalogue so saved carts keep working.
export const food_list = [
  { _id: "1", name: "Greek Salad", image: greek_salad, price: 12, rating: 4.6, time: 20, veg: true, category: "Salad",
    description: "Crisp cucumber, tomato, olives and a slab of feta with oregano dressing.",
    taste: ["Tangy", "Fresh", "Herby"],
    ingredients: ["Cucumber", "Tomato", "Feta", "Kalamata olives", "Red onion", "Oregano"] },
  { _id: "2", name: "Garden Veg Salad", image: veg_salad, price: 10, rating: 4.4, time: 15, veg: true, category: "Salad",
    description: "Lettuce, peppers, sweet corn and carrots tossed in lemon vinaigrette.",
    taste: ["Fresh", "Zesty", "Light"],
    ingredients: ["Lettuce", "Bell peppers", "Sweet corn", "Carrot", "Cherry tomato", "Lemon vinaigrette"] },
  { _id: "3", name: "Clover Sprout Salad", image: clover_salad, price: 14, rating: 4.5, time: 15, veg: true, category: "Salad",
    description: "Microgreens, avocado, radish and toasted seeds with citrus dressing.",
    taste: ["Fresh", "Nutty", "Citrusy"],
    ingredients: ["Clover sprouts", "Microgreens", "Avocado", "Radish", "Pumpkin seeds", "Lemon"] },
  { _id: "4", name: "Grilled Chicken Salad", image: chicken_salad, price: 16, rating: 4.7, time: 25, veg: false, category: "Salad",
    description: "Chargrilled chicken over romaine with parmesan and garlic croutons.",
    taste: ["Smoky", "Savory", "Creamy"],
    ingredients: ["Grilled chicken", "Romaine", "Parmesan", "Croutons", "Cherry tomato", "Caesar dressing"] },
  { _id: "5", name: "Lasagna Rolls", image: lasagna_rolls, price: 14, rating: 4.5, time: 30, veg: true, category: "Rolls",
    description: "Ricotta-spinach lasagna roll-ups baked in marinara and mozzarella.",
    taste: ["Cheesy", "Rich", "Herby"],
    ingredients: ["Lasagna sheets", "Ricotta", "Spinach", "Marinara", "Mozzarella", "Basil"] },
  { _id: "6", name: "Peri Peri Wrap", image: peri_peri_rolls, price: 12, rating: 4.4, time: 20, veg: false, category: "Rolls",
    description: "Fiery peri peri chicken, crunchy slaw and chilli mayo in a toasted wrap.",
    taste: ["Spicy", "Smoky", "Tangy"],
    ingredients: ["Peri peri chicken", "Tortilla", "Slaw", "Chilli mayo", "Lettuce"] },
  { _id: "7", name: "Chicken Kathi Roll", image: chicken_rolls, price: 11, rating: 4.8, time: 20, veg: false, category: "Rolls",
    description: "Tandoori chicken tikka, pickled onions and mint chutney in flaky paratha.",
    taste: ["Spicy", "Smoky", "Tangy"],
    ingredients: ["Chicken tikka", "Paratha", "Pickled onion", "Mint chutney", "Chaat masala"] },
  { _id: "8", name: "Veg Spring Rolls", image: veg_rolls, price: 9, rating: 4.3, time: 15, veg: true, category: "Rolls",
    description: "Golden, crackly rolls stuffed with veggies, served with sweet chilli dip.",
    taste: ["Crispy", "Savory", "Sweet chilli"],
    ingredients: ["Cabbage", "Carrot", "Spring onion", "Glass noodles", "Sweet chilli sauce"] },
  { _id: "9", name: "Raspberry Ripple", image: ripple_ice_cream, price: 7, rating: 4.6, time: 10, veg: true, category: "Desserts",
    description: "Vanilla ice cream swirled with tangy raspberry ripple.",
    taste: ["Sweet", "Fruity", "Creamy"],
    ingredients: ["Vanilla ice cream", "Raspberry ripple", "Fresh raspberries"] },
  { _id: "10", name: "Fruit Sundae", image: fruit_ice_cream, price: 9, rating: 4.5, time: 10, veg: true, category: "Desserts",
    description: "Vanilla scoops buried in mango, strawberry and kiwi with pistachio.",
    taste: ["Sweet", "Fruity", "Fresh"],
    ingredients: ["Vanilla ice cream", "Mango", "Strawberry", "Kiwi", "Pistachio"] },
  { _id: "11", name: "Brownie Jar", image: jar_ice_cream, price: 8, rating: 4.8, time: 10, veg: true, category: "Desserts",
    description: "Layers of fudge brownie, chocolate ice cream and toasted walnuts.",
    taste: ["Chocolatey", "Rich", "Nutty"],
    ingredients: ["Fudge brownie", "Chocolate ice cream", "Chocolate sauce", "Walnuts"] },
  { _id: "12", name: "Vanilla Bean Scoops", image: vanilla_ice_cream, price: 6, rating: 4.4, time: 10, veg: true, category: "Desserts",
    description: "Three scoops of real Madagascar vanilla bean with a crisp wafer.",
    taste: ["Sweet", "Creamy", "Classic"],
    ingredients: ["Vanilla bean ice cream", "Wafer roll"] },
  { _id: "13", name: "Chicken Club Sandwich", image: chicken_sandwich, price: 13, rating: 4.6, time: 20, veg: false, category: "Sandwich",
    description: "Triple-decker with roast chicken, lettuce, tomato and fries on the side.",
    taste: ["Savory", "Hearty", "Crunchy"],
    ingredients: ["Roast chicken", "Toasted bread", "Lettuce", "Tomato", "Mayo", "Fries"] },
  { _id: "14", name: "Vegan Sandwich", image: vegan_sandwich, price: 11, rating: 4.3, time: 15, veg: true, category: "Sandwich",
    description: "Multigrain bread layered with hummus, avocado and roasted peppers.",
    taste: ["Fresh", "Earthy", "Light"],
    ingredients: ["Multigrain bread", "Hummus", "Avocado", "Spinach", "Roasted peppers", "Cucumber"] },
  { _id: "15", name: "Grilled Cheese Sandwich", image: grilled_sandwich, price: 10, rating: 4.5, time: 15, veg: true, category: "Sandwich",
    description: "Buttery sourdough, gooey cheddar and grilled vegetables.",
    taste: ["Cheesy", "Buttery", "Crispy"],
    ingredients: ["Sourdough", "Cheddar", "Grilled veggies", "Butter"] },
  { _id: "16", name: "Bread Sandwich", image: bread_sandwich, price: 8, rating: 4.1, time: 10, veg: true, category: "Sandwich",
    description: "Soft white bread, fresh veggies and a light herb spread.",
    taste: ["Light", "Fresh", "Mild"],
    ingredients: ["White bread", "Cucumber", "Tomato", "Lettuce", "Herb spread"] },
  { _id: "17", name: "Berry Cupcakes", image: cup_cake, price: 8, rating: 4.5, time: 15, veg: true, category: "Cake",
    description: "Fluffy vanilla cupcakes topped with berry buttercream and sprinkles.",
    taste: ["Sweet", "Fruity", "Fluffy"],
    ingredients: ["Vanilla sponge", "Berry buttercream", "Sprinkles", "Raspberry"] },
  { _id: "18", name: "Vegan Chocolate Cake", image: vegan_cake, price: 12, rating: 4.4, time: 15, veg: true, category: "Cake",
    description: "Dairy-free dark chocolate layers finished with fresh berries.",
    taste: ["Chocolatey", "Rich", "Fruity"],
    ingredients: ["Dark chocolate", "Oat milk", "Coconut oil", "Mixed berries"] },
  { _id: "19", name: "Butterscotch Cake", image: butterscotch_cake, price: 22, rating: 4.7, time: 30, veg: true, category: "Cake",
    description: "Caramel-drip sponge with whipped cream and crunchy praline.",
    taste: ["Sweet", "Caramel", "Crunchy"],
    ingredients: ["Butterscotch sponge", "Caramel", "Whipped cream", "Praline"] },
  { _id: "20", name: "Sliced Cake", image: sliced_cake, price: 9, rating: 4.2, time: 15, veg: true, category: "Cake",
    description: "A generous slice of the day's house-baked layer cake.",
    taste: ["Sweet", "Soft", "Classic"],
    ingredients: ["Sponge cake", "Buttercream", "Vanilla"] },
  { _id: "21", name: "Garlic Butter Mushroom", image: garlic_mushroom, price: 12, rating: 4.5, time: 20, veg: true, category: "Pure Veg",
    description: "Mushrooms seared in garlic butter with parsley and cracked pepper.",
    taste: ["Garlicky", "Buttery", "Earthy"],
    ingredients: ["Button mushrooms", "Garlic", "Butter", "Parsley", "Black pepper"] },
  { _id: "22", name: "Gobi 65", image: gobi_65, price: 10, rating: 4.6, time: 20, veg: true, category: "Pure Veg",
    description: "Crispy spiced cauliflower tossed with curry leaves and green chilli.",
    taste: ["Spicy", "Crispy", "Tangy"],
    ingredients: ["Cauliflower", "Rice flour", "Curry leaves", "Green chilli", "Kashmiri chilli"] },
  { _id: "23", name: "Mix Veg Pulao", image: veg_pulao, price: 11, rating: 4.4, time: 25, veg: true, category: "Pure Veg",
    description: "Fragrant basmati with seasonal vegetables, cashews and whole spices.",
    taste: ["Aromatic", "Mild", "Savory"],
    ingredients: ["Basmati rice", "Peas", "Carrot", "Beans", "Cashews", "Whole spices"] },
  { _id: "24", name: "Rice Zucchini", image: rice_zucchini, price: 12, rating: 4.2, time: 25, veg: true, category: "Pure Veg",
    description: "Herbed rice with sautéed zucchini and a squeeze of lemon.",
    taste: ["Herby", "Light", "Zesty"],
    ingredients: ["Rice", "Zucchini", "Garlic", "Lemon", "Parsley"] },
  { _id: "25", name: "Four Cheese Mac", image: cheese_pasta, price: 13, rating: 4.7, time: 25, veg: true, category: "Pasta",
    description: "Baked macaroni in a four-cheese sauce under a golden crumb crust.",
    taste: ["Cheesy", "Creamy", "Rich"],
    ingredients: ["Macaroni", "Cheddar", "Mozzarella", "Parmesan", "Gruyère", "Breadcrumbs"] },
  { _id: "26", name: "Tomato Basil Pasta", image: tomato_pasta, price: 12, rating: 4.4, time: 20, veg: true, category: "Pasta",
    description: "Fusilli in slow-cooked tomato sauce with fresh basil.",
    taste: ["Tangy", "Herby", "Savory"],
    ingredients: ["Fusilli", "Tomato sauce", "Garlic", "Basil", "Olive oil"] },
  { _id: "27", name: "Creamy Pasta", image: creamy_pasta, price: 14, rating: 4.5, time: 20, veg: true, category: "Pasta",
    description: "Silky parmesan cream sauce with garlic and black pepper.",
    taste: ["Creamy", "Garlicky", "Rich"],
    ingredients: ["Pasta", "Cream", "Parmesan", "Garlic", "Black pepper"] },
  { _id: "28", name: "Chicken Pasta", image: chicken_pasta, price: 16, rating: 4.6, time: 25, veg: false, category: "Pasta",
    description: "Grilled chicken, cherry tomatoes and pasta in a herby sauce.",
    taste: ["Savory", "Herby", "Hearty"],
    ingredients: ["Pasta", "Grilled chicken", "Cherry tomato", "Herbs", "Parmesan"] },
  { _id: "29", name: "Butter Noodles", image: butter_noodles, price: 10, rating: 4.3, time: 15, veg: true, category: "Noodles",
    description: "Garlic butter noodles finished with sesame and spring onion.",
    taste: ["Buttery", "Garlicky", "Mild"],
    ingredients: ["Wheat noodles", "Butter", "Garlic", "Sesame", "Spring onion"] },
  { _id: "30", name: "Veg Hakka Noodles", image: veg_noodles, price: 11, rating: 4.5, time: 20, veg: true, category: "Noodles",
    description: "Wok-tossed noodles with cabbage, carrots and peppers.",
    taste: ["Savory", "Spicy", "Umami"],
    ingredients: ["Hakka noodles", "Cabbage", "Carrot", "Bell peppers", "Soy sauce", "Spring onion"] },
  { _id: "31", name: "Somen Noodles", image: somen_noodles, price: 14, rating: 4.4, time: 20, veg: true, category: "Noodles",
    description: "Delicate Japanese wheat noodles in a light soy broth.",
    taste: ["Light", "Umami", "Delicate"],
    ingredients: ["Somen noodles", "Soy broth", "Spring onion", "Nori"] },
  { _id: "32", name: "Stir-fry Noodles", image: cooked_noodles, price: 13, rating: 4.3, time: 20, veg: false, category: "Noodles",
    description: "Smoky wok noodles with egg, greens and chilli oil.",
    taste: ["Smoky", "Spicy", "Umami"],
    ingredients: ["Wok noodles", "Egg", "Greens", "Chilli oil", "Soy sauce"] },

  // New dishes
  { _id: "33", name: "Bombay Masala Sandwich", image: bombay_sandwich, price: 7, rating: 4.7, time: 15, veg: true, category: "Sandwich", isNew: true,
    description: "Mumbai street classic with spiced potato, green chutney and veggies.",
    taste: ["Spicy", "Tangy", "Crunchy"],
    ingredients: ["Bread", "Spiced potato", "Green chutney", "Tomato", "Cucumber", "Onion"] },
  { _id: "34", name: "Red Velvet Cake", image: red_velvet_cake, price: 10, rating: 4.8, time: 15, veg: true, category: "Cake", isNew: true,
    description: "Moist cocoa layers stacked with tangy cream cheese frosting.",
    taste: ["Sweet", "Tangy", "Velvety"],
    ingredients: ["Cocoa sponge", "Buttermilk", "Cream cheese frosting", "Vanilla"] },
  { _id: "35", name: "Paneer Butter Masala", image: paneer_butter_masala, price: 15, rating: 4.9, time: 30, veg: true, category: "Pure Veg", isNew: true,
    description: "Soft paneer in a rich tomato-butter gravy, served with butter naan.",
    taste: ["Creamy", "Rich", "Mildly spicy"],
    ingredients: ["Paneer", "Tomato", "Butter", "Cream", "Kasuri methi", "Butter naan"] },
];

export const hero_images = [chicken_rolls, paneer_butter_masala, greek_salad, butterscotch_cake];
export const onboarding_images = [paneer_butter_masala, chicken_sandwich, jar_ice_cream];
