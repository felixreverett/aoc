package aoc2022

// scala-cli 2022 --main-class aoc2022.run

import scala.compiletime.ops.double

val days = Map(
    "day01part1" -> ( () => Day01.partOne()),
    "day01part2" -> ( () => Day01.partTwo()),
    "day02part1" -> ( () => Day02.partTwo()),
    "day02part2" -> ( () => Day02.partTwo()),
    "day03part1" -> ( () => Day03.partOne()),
    "day03part2" -> ( () => Day03.partTwo()),
    "day04part1" -> ( () => Day04.partOne()),
    "day04part2" -> ( () => Day04.partTwo()),
    "day05part1" -> ( () => Day05.partTwo()),
    "day05part2" -> ( () => Day05.partTwo()),
    "day06part1" -> ( () => Day06.partOne()),
    "day06part2" -> ( () => Day06.partTwo()),
    "day07part1" -> ( () => Day07.partOne()),
    "day07part2" -> ( () => Day07.partTwo()),
    "day08part1" -> ( () => Day08.partTwo()),
    "day08part2" -> ( () => Day08.partTwo()),
    "day09part1" -> ( () => Day09.partOne())
)

def runAll(times: Int): Unit = {

    println("Warming up program")
    days.foreach { case (id, func) =>
        print(".")
        func()    
    }
    println("\nWarmup complete. Running benchmarks...")

    //
    val allResults = days.foldLeft( Map[String, (Double, Double, Double)]() ) {
        case ( acc, (dayID, func) ) =>
            val (totalTime, minTime, maxTime) = (1 to times).foldLeft( (0.0d, Double.MaxValue, 0.0d) ) {
                case ( (total, min, max), _) =>
                    val (_, duration) = func()

                    val newMin = if (duration < min) duration else min
                    val newMax = if (duration > max) duration else max
                    
                    (total + duration, newMin, newMax)
            }
            
            (acc + (dayID -> (totalTime/times, minTime, maxTime)))
    }

    println("\n" + "="*55)
    println(f"${"Day ID"}%-15s | ${"Avg (ms)"}%-10s | ${"Min (ms)"}%-10s | ${"Max (ms)"}%-10s")
    println("-" * 55)

    // Sort the results by key (Day ID) so they print in order
    allResults.toSeq.sortBy(_._1).foreach { 
        case (dayID, (avg, min, max)) =>
            println(f"$dayID%-15s | $avg%-10.4f | $min%-10.4f | $max%-10.4f")
    }
    println("="*55)
}

@main def run(): Unit = {

    runAll(10)
}