import scala.io.Source
import java.io.File

def partOne(): Int = {
    val filename = "2022/01/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    input
        .split("\r?\n\r?\n")
        .toList
        .map { group =>
            group
                .split("\n")
                .map(_.trim)
                .filter(_.nonEmpty)
                .map(_.toInt)
                .toList
                .sum
        }
        .max
}

def partTwo(): Int = {
    val filename = "2022/01/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    input
        .split("\r?\n\r?\n")
        .view
        .map { group =>
            group.split("\n").flatMap(_.trim.toIntOption).sum
        }
        .toList
        .sorted(using Ordering.Int.reverse)
        .take(3)
        .sum
}

@main def run(): Unit = {
    val s1 = System.nanoTime()
    val p1 = partOne()
    val d1 = (System.nanoTime() - s1) / 1e6
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    val s2 = System.nanoTime()
    val p2 = partTwo()
    val d2 = (System.nanoTime() - s2) / 1e6
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")
}