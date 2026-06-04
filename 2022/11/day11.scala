package aoc2022

import scala.io.Source
import java.io.File
import java.io.FileNotFoundException
import scala.compiletime.ops.string

@main def run11(): Unit = {
    val (p1, d1) = Day11.partOne(20)
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = Day11.partTwo(10000)
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}

object Day11 {

    /**
      * The immutable state of a Monkey at a single point in time.
      * @param id Unique identifier for the Monkey.
      * @param items List of worry levels for the Monkey's items.
      * @param operation Lambda function that calculates how to change an item's worry level.
      * @param divTest Number used to test the worry level.
      * @param ifTrue The ID of the destination monkey if the divTest passes.
      * @param ifFalse The ID of the destination monkey if the divTest fails.
      * @param inspectedItems Total tally of items this monkey has inspected across all rounds.
      */
    case class Monkey(
        id:             Int,
        items:          List[Long],
        operation:      Long => Long,
        divTest:        Int,
        ifTrue:         Int,
        ifFalse:        Int,
        inspectedItems: Long
    )

    /**
      * Algebraic type to denote valid states of a Token.
      * Equivalent to: `Token ::= VarX | Num num | Operator (num -> num -> num)`
      */
    sealed trait Token
    case object VarX extends Token
    case class Num(value: Long) extends Token
    case class Operator(func: (Long, Long) => Long) extends Token

    extension (expression: String) {
        
        /**
         * Builds a left-associative lambda function from an expression of type String.
         * We assume the expression contains only valid values from the Token type above.
         */
        def toOperation: Long => Long = {

            val tokens: List[Token] = expression
                .trim
                .split(" ")
                .toList
                .map { 
                    case "old"  => VarX
                    case "+"    => Operator(_ + _)
                    case "-"    => Operator(_ - _)
                    case "*"    => Operator(_ * _)
                    case "/"    => Operator(_ / _)
                    case num    => Num(num.toLong)
                }

            (x: Long) => {
                def resolve(t: Token): Long = t match {
                    case VarX => x
                    case Num(n) => n
                    case other => throw new Exception(s"Expected a value token. Received $other")
                }

                // Recursively extract 3 items from the Token list to generate lambda expression.
                def evaluate(remainingTokens: List[Token]): Long = remainingTokens match {

                    case t1 :: Operator(op) :: t2 :: rest =>
                        val leftVal = resolve(t1)
                        val rightVal = resolve(t2)
                        val result = op(leftVal, rightVal)

                        evaluate(Num(result) :: rest)

                    case finalToken :: Nil =>
                        resolve(finalToken)

                    case _ => throw new Exception("Invalid expression")
                }

                evaluate(tokens)
            }
        }
    }

    /** 
      * Takes an Int value and a Monkey as arguments and calculates the destination monkey index
      */
    def getTargetIndex(value: Long, monkey: Monkey, isPartTwo: Boolean = false, commonMultiple: Long = 3): (Int, Long) = {

        val operatedValue: Long = monkey.operation(value)

        val dividedValue: Long = if (isPartTwo) {
            operatedValue % commonMultiple
        } else {
            operatedValue / 3
        }

        val targetIndex = if (dividedValue % monkey.divTest == 0) {
            monkey.ifTrue
        } else {
            monkey.ifFalse
        }

        (targetIndex, dividedValue)
    }

    def partOne(number_of_rounds: Int = 20): (Int, Double) = {

        val filename = "11/input.txt"
        
        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        // Initial parsed list of Monkeys and their data
        val monkeyList: Vector[Monkey] = input
            .split("\r?\n\r?\n")
            .map { monkey => 
                val lines = monkey.split("\r?\n")
                val id = lines(0).replaceAll("\\D", "").toInt
                val items = lines(1).trim.replace("Starting items: ", "").split(", ").toList.map(_.toLong)
                val operation = lines(2).trim.replace("Operation: new = ", "").toOperation
                val divTest = lines(3).replaceAll("\\D", "").toInt
                val ifTrue = lines(4).replaceAll("\\D", "").toInt
                val ifFalse = lines(5).replaceAll("\\D", "").toInt

                Monkey(
                    id =         id,
                    items =      items,
                    operation =  operation,
                    divTest =    divTest,
                    ifTrue =     ifTrue,
                    ifFalse =    ifFalse,
                    inspectedItems = 0
                )
            }
            .toVector

        // The state of monkeys after all rounds of inspections. Takes the initial monkeyList as the seed,
        // and passes forwards the accumulatingMList and roundNumber from each round.
        val inspectedMonkeys: Vector[Monkey] = (0 until number_of_rounds)
            .foldLeft(monkeyList) { (accumulatedMList, roundNumber) =>

                // For each round, iterate over every monkey. Take the current accumulatedMList as the seed,
                // the roundMList of each iteration as the accumulator, and the monkey's index as the current index.
                (0 until accumulatedMList.length).foldLeft(accumulatedMList) { (roundMList, mIndex) =>

                    val currentM = roundMList(mIndex)
                    val itemsToProcess = currentM.items

                    // For each monkey iteration, fold over every item. Take the current roundMList as the seed,
                    // the itemProcessMList from each fold as the accumulator, and the currentItem as the element.
                    itemsToProcess.foldLeft(roundMList) { (itemProcessMList, currentItem) => 
                        
                        val srcMonkey = itemProcessMList(mIndex)

                        val (targetIndex, newItemValue) = getTargetIndex(currentItem, srcMonkey)

                        val destMonkey = itemProcessMList(targetIndex)

                        val updatedSrcMonkey = srcMonkey.copy(
                            items = srcMonkey.items.tail,
                            inspectedItems = srcMonkey.inspectedItems + 1
                        )

                        val updatedDestMonkey = destMonkey.copy(items = destMonkey.items :+ newItemValue)

                        if (mIndex == targetIndex) {
                            itemProcessMList
                        } else {
                            itemProcessMList
                                .updated(mIndex, updatedSrcMonkey)
                                .updated(targetIndex, updatedDestMonkey)
                        }
                    }    
                }
            }
        
        // Take the two Monkeys with the most items inspected and multiply their values
        val solution = inspectedMonkeys
            .map(_.inspectedItems)
            .sorted(using Ordering[Long].reverse)
            .take(2)
            .product
            .toInt
            
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }

    def partTwo(number_of_rounds: Int = 10000): (Long, Double) = {

        val filename = "11/input.txt"

        val input: String = try {
            Source.fromFile(new File(filename)).mkString
        } catch {
            case e: FileNotFoundException =>
                println(s"[!] Could not file the file specified: \"$filename\". Aborting program.")
                sys.exit(1)
        }

        val startTime = System.nanoTime()

        val monkeyList: Vector[Monkey] = input
            .split("\r?\n\r?\n")
            .map { monkey => 
                val lines = monkey.split("\r?\n")
                val id = lines(0).replaceAll("\\D", "").toInt
                val items = lines(1).trim.replace("Starting items: ", "").split(", ").toList.map(_.toLong)
                val operation = lines(2).trim.replace("Operation: new = ", "").toOperation
                val divTest = lines(3).replaceAll("\\D", "").toInt
                val ifTrue = lines(4).replaceAll("\\D", "").toInt
                val ifFalse = lines(5).replaceAll("\\D", "").toInt

                Monkey(
                    id =         id,
                    items =      items,
                    operation =  operation,
                    divTest =    divTest,
                    ifTrue =     ifTrue,
                    ifFalse =    ifFalse,
                    inspectedItems = 0
                )
            }
            .toVector

        val commonMultiple = monkeyList.map(_.divTest).product

        val inspectedMonkeys: Vector[Monkey] = (0 until number_of_rounds)
            .foldLeft(monkeyList) { (accumulatedMList, roundNumber) =>

                (0 until accumulatedMList.length).foldLeft(accumulatedMList) { (roundMList, mIndex) =>

                    val currentM = roundMList(mIndex)
                    val itemsToProcess = currentM.items

                    itemsToProcess.foldLeft(roundMList) { (itemProcessMList, currentItem) => 
                        
                        val srcMonkey = itemProcessMList(mIndex)

                        val (targetIndex, newItemValue) = getTargetIndex(currentItem, srcMonkey, true, commonMultiple)

                        val destMonkey = itemProcessMList(targetIndex)

                        val updatedSrcMonkey = srcMonkey.copy(
                            items = srcMonkey.items.tail,
                            inspectedItems = srcMonkey.inspectedItems + 1
                        )

                        val updatedDestMonkey = destMonkey.copy(items = destMonkey.items :+ newItemValue)

                        if (mIndex == targetIndex) {
                            itemProcessMList
                        } else {
                            itemProcessMList
                                .updated(mIndex, updatedSrcMonkey)
                                .updated(targetIndex, updatedDestMonkey)
                        }
                    }    
                }
            }
        
        val solution = inspectedMonkeys
            .map(_.inspectedItems)
            .sorted(using Ordering[Long].reverse)
            .take(2)
            .product
            
        val duration = (System.nanoTime() - startTime) / 1e6

        (solution, duration)
    }
}