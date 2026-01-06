package aoc2022.day5

import scala.io.Source
import java.io.File
import scala.compiletime.ops.string

def partOne(): (String, Double) = {
    val filename = "2022/05/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val (initialStacks, instructions) = input
        .split("""(\r?\n){2}""")
        .toList match {
            case List(s, i) =>
                val stacks = s
                    .split("(\r?\n)")
                    .map(line => line.grouped(4).map(_.charAt(1)).toArray)
                    .transpose
                    .map(_.filter(_.isLetter).reverse)
                val instructions = i
                    .split("\r?\n")
                    .map { 
                        case s"move $amount from $src to $dest" =>
                            (amount.toInt, src.toInt, dest.toInt)
                    }
                (stacks, instructions)
            case _ => throw new Exception("Could not split into stacks and instructions")
        }

    val solution = instructions.foldLeft(initialStacks) { (currentStacks, instr) =>
        val (amount, from, to) = instr
        val srcIndex = from - 1
        val destIndex = to - 1
        val toMove = currentStacks(srcIndex).takeRight(amount)
        val newSource = currentStacks(srcIndex).dropRight(amount)
        val newDest = currentStacks(destIndex) ++ toMove.reverse
        currentStacks.updated(srcIndex, newSource).updated(destIndex, newDest)
    }
    .map(_.last).mkString

    val duration = (System.nanoTime() - startTime) / 1e6

    (solution, duration)
}

def partTwo(): (String, Double) = {
    val filename = "2022/05/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val startTime = System.nanoTime()

    val (initialStacks, instructions) = input
        .split("""(\r?\n){2}""")
        .toList match {
            case List(s, i) =>
                val stacks = s
                    .split("(\r?\n)")
                    .map(line => line.grouped(4).map(_.charAt(1)).toArray)
                    .transpose
                    .map(_.filter(_.isLetter).reverse)
                val instructions = i
                    .split("\r?\n")
                    .map { 
                        case s"move $amount from $src to $dest" =>
                            (amount.toInt, src.toInt, dest.toInt)
                    }
                (stacks, instructions)
            case _ => throw new Exception("Could not split into stacks and instructions")
        }

    val solution = instructions.foldLeft(initialStacks) { (currentStacks, instr) => 
        val (amount, from, to) = instr
        val srcIndex = from - 1
        val destIndex = to - 1
        val toMove = currentStacks(srcIndex).takeRight(amount)
        val newSource = currentStacks(srcIndex).dropRight(amount)
        val newDest = currentStacks(destIndex) ++ toMove
        currentStacks.updated(srcIndex, newSource).updated(destIndex, newDest)    
    }
    .map(_.last).mkString

    val duration = (System.nanoTime() - startTime) / 1e6

    (solution, duration)
}

@main def run(): Unit = {
    val (p1, d1) = partOne()
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val (p2, d2) = partTwo()
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}