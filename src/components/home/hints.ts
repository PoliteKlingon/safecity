const hints = [
  "A drunk guy is barking outside this house",
  "There is a suspiciously looking woman trying to break into the kids' playground.",
  "A person in a clown costume is wandering the streets at midnight",
  "Someone is spray painting graffiti on the park's fountain",
  "A man is juggling knives in front of the grocery store",
  "A car is driving backwards down Main Street",
  "A kid is selling fireworks out of a backpack near the school",
  "There's a person playing the tuba loudly on the bus",
  "Someone is fishing in the community pool",
  "A woman is walking a goat on a leash in the city park",
  "A group is having a bonfire in the middle of the parking lot",
  "A person is flying a drone suspiciously close to windows",
  "Someone is trying to pick the lock of the library after hours",
  "A man in a ninja costume is climbing the office building",
  "There's a person dressed as a pirate digging in the playground",
  "A group of people are racing shopping carts down the street",
  "Someone is camping in a tent in the middle of the roundabout",
  "A person is doing backflips off the public fountain",
  "There's a guy dressed as a ghost scaring people in the alley",
  "A woman is feeding pigeons with bags of popcorn on the square",
  "Someone is DJing loudly from their balcony at 2 AM",
  "A person is trying to scale the city's Christmas tree",
  "A guy is offering 'free hugs' and looks very persistent",
  "Someone is walking around with a metal detector on private lawns",
  "A woman is shouting poetry at passersby on the corner",
  "A man is trying to fix his car with duct tape and hope",
  "Someone is playing hopscotch on the busy sidewalk",
  "A person is running an impromptu petting zoo in the park",
  "There's a guy selling 'magic beans' out of his trench coat",
  "A woman is setting up a hammock between two streetlights",
  "A man is practicing his sword-fighting skills with a broomstick",
  "Someone is singing opera very loudly outside the coffee shop",
];

export const getHint = () => {
  const randomIndex = Math.floor(Math.random() * hints.length);
  return hints[randomIndex];
};
