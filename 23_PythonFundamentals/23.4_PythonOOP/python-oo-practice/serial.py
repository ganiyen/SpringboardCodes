"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start=0):
        """initialize serial number to the starting number. if start is not specified, default to 0"""

        self.num=start-1
        self.start=start

    def __repr__(self):
        """show string representation"""
        return f"Class to generate serial number. start: {self.start}, next: {self.num + 2} "
    
    def generate(self):
        """generate serial number"""

        self.num += 1
        return self.num

    def reset(self):
        """reset serial number to the beginning"""

        self.num = self.start-1
