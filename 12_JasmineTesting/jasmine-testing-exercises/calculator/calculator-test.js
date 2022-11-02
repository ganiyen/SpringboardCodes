
it('should calculate the monthly rate correctly', function () {
  // ...
  expect(calculateMonthlyPayment(1000,1,1)).toEqual("83.79")
  expect(calculateMonthlyPayment(2000,1,1)).toEqual("167.57")
  expect(calculateMonthlyPayment(2000,10,10)).toEqual("26.43")
});


it("should return a result with 2 decimal places", function() {
  // ...
  test = parseInt(calculateMonthlyPayment(1000,1,1))*100;
  expect(Number.isInteger(test)).toEqual(true)

  test = parseInt(calculateMonthlyPayment(10000,10,10))*100;
  expect(Number.isInteger(test)).toEqual(true)

  test = parseInt(calculateMonthlyPayment(888,50,50))*100;
  expect(Number.isInteger(test)).toEqual(true)
});

/// etc
