"""Word Finder: finds random words from a dictionary."""

from random import choice

class WordFinder:
    """reads words from a file (one word per line)"""

    def __init__(self, address):
        """read words from the provided file, save the words in a list"""

        self.address = address
        self.read_file()

    def read_file(self):
        """open file, read words one line at a time, save the words into a list. print the number of words in the file"""

        file = open(self.address, "r")

        self.word_list = []
        self.word_list = [line[:-1:] for line in file]

        file.close()
        print(f"{len(self.word_list)} words read")

    def random(self):
        """print a random word from the file"""

        return choice(self.word_list)
    

class SpecialWordFinder (WordFinder):
    """class inherited from WordFinder, ignore comment # and blank lines in the word list"""

        def __init__(self, address):
            """read files, ignore comment # and blank lines"""

            super().__init__(address)
          
            temp_list = []
            for word in self.word_list:
                if (word != "") and (word[0]!= "#"):
                    temp_list.append(word)
            
            self.word_list = temp_list
        
        

