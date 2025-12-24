import scala.io.Source
import java.io.File

def XYZScore(c: String): Int = {
    c match
        case "Z" => 3
        case "Y" => 2
        case "X" => 1
}

def partOne(): Int = {
    val filename = "2022/02/input.txt"
    val input = Source.fromFile(new File(filename)).mkString

    val rounds = input
        .split("\r?\n")
        .filter(_.trim.nonEmpty)
        .map { line =>
            val parts = line.split(" ")
            (parts(0), parts(1))
        }

    rounds.map { (i, j) =>
        (i, j) match
            case ("A", "Y") | ("B", "Z") | ("C", "X") => 6 + XYZScore(j)
            case ("A", "X") | ("B", "Y") | ("C", "Z") => 3 + XYZScore(j)
            case _ => XYZScore(j)
    }.sum
}

@main def run(): Unit = {
    val s1 = System.nanoTime()
    val p1 = partOne()
    val d1 = (System.nanoTime() - s1) / 1e6
    println(s"Part 1 Solution: ${p1}")
    println(s"Time Part 1: ${d1}ms")

    /*
    val s2 = System.nanoTime()
    val p2 = partTwo()
    val d2 = (System.nanoTime() - s2) / 1e6
    println(s"Part 2 Solution: ${p2}")
    println(s"Time Part 2: ${d2}ms")*/
}