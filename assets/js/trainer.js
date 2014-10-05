
// Controller
var leapController = new Leap.Controller();
var trainer = new LeapTrainer.Controller({controller: leapController});
leapController.connect();

trainer.create('Halt');