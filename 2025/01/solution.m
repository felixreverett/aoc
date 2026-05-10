|| Miranda Solution

main = "Part 1: " ++ show (partOne parsedInput) ++
       "\n" ++
       "Part 2: " ++ show (partTwo parsedInput) ++
       "\n"

filePath     = "input.txt"
dialLocation = 50
timesAtZero  = 0
parsedInput  = split "\n" (read filePath)

partOne :: [str] -> num
partOne input
  = xPartOne input dialLocation timesAtZero
    where

    || xPartOne :: [str] -> num -> num -> num
    || > takes the input plus two accumulators. Returns the final
    ||   value of accumulator 't'

    || Converging case: On the empty list, return t
    xPartOne [] d t
      = t

    || Recursive case: get tail plus new accumulators d, t
    xPartOne (front : rest) currentD currentT
      = xPartOne rest newD newT
        where
        newD
          = ((currentD + (parseTurn front) mod 100) + 100) mod 100
        newT = currentT + 1, if newD = 0
             = currentT, otherwise

|| =========================================

parseTurn :: str -> num
parseTurn ('L' : amount) = -(numval amount)
parseTurn ('R' : amount) = numval amount

|| =========================================

partTwo :: [str] -> num

partTwo input
  = xPartTwo input dialLocation timesAtZero
    where

    xPartTwo [] d t
      = t

    xPartTwo (front : rest) currentLoc currentT
      = xPartTwo rest newLoc newT
        where

        || gets where the dial would go without bounds

        rawLoc = currentLoc + parseTurn front

        || find how many times the dial passed zero

        newLoc = ((rawLoc mod 100) + 100) mod 100

        || Gets new timesAtZero. Because the bounds are 0 to 99,
        || we need to add + 1 to timesAtZero if the value was
        || negative (e.g. 3 to -1 crosses zero, but -1 div 100 = 0)

        newT    = currentT + (abs rawLoc) div 100 + extra + hitZero
        extra   = 1, if rawLoc < 0 & currentLoc ~= 0
                = 0, otherwise
        hitZero = 1, if rawLoc = 0
                = 0, otherwise


|| ===== boilerplate utility functions =====

str == [char]

split :: str -> str -> [str]
split delim string
  = reverse (xsplit string [] [])
    where
    xsplit [] acc substring = substring : acc
    xsplit remaining acc substring
      = xsplit (drop (#delim) remaining) (substring : acc) [], if remaining $startsWith delim
      = xsplit (tl remaining) acc (substring ++ [hd remaining]), otherwise

startsWith :: str -> str -> bool
startsWith string matcher
  = xstartsWith string matcher
    where
    xstartsWith string [] = True
    xstartsWith []     any = False
    xstartsWith (x:xs) (x:ys) = xstartsWith xs ys
    xstartsWith (x:xs) (y:ys) = False

|| =========================================