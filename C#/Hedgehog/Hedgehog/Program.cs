using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hedgehog
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.InputEncoding = Encoding.Unicode;
            Console.OutputEncoding = Encoding.Unicode;

            int[] hedgehog = new int[3];
            int targetColor;
            int result;

            while (true)
            {
                Console.WriteLine("Введіть кількість червоних їжаків:");
                hedgehog[0] = Convert.ToInt32(Console.ReadLine());

                Console.WriteLine("------------------------------------");

                Console.WriteLine("Введіть кількість зелених їжаків:");
                hedgehog[1] = Convert.ToInt32(Console.ReadLine());

                Console.WriteLine("------------------------------------");

                Console.WriteLine("Введіть кількість синіх їжаків:");
                hedgehog[2] = Convert.ToInt32(Console.ReadLine());

                Console.WriteLine("------------------------------------");

                Console.WriteLine("У який колір фарбувати їжаків(число):");
                targetColor = Convert.ToInt32(Console.ReadLine());

                Console.WriteLine("------------------------------------");

                result = HedgehogPainter(hedgehog, targetColor);

                if (result == -1)
                {
                    Console.WriteLine("Неможливо перефарбувати всіх їжаків в цей колір");
                }
                else
                {
                    Console.WriteLine($"Мінімальна кількість зустрічей: {result}");
                }
                Console.WriteLine("------------------------------------");

            }

        }

        static int HedgehogPainter(int[] arr, int Color)
        {
            int countMoves = 0;

            if ((arr[0] == 0 && arr[1] == 0) || (arr[1] == 0 && arr[2] == 0) || (arr[0] == 0 && arr[2] == 0))
            {
                return -1;
            }

            int maxIterations = arr.Sum();

            while (((arr[0] > 0 && arr[1] > 0) || (arr[1] > 0 && arr[2] > 0) || (arr[0] > 0 && arr[2] > 0)) && countMoves < maxIterations)
            {

                if (Color == 0 && arr[1] > 0 && arr[2] > 0)
                {
                    arr = repaintedIn(arr,Color);
                }
                else if (Color == 1 && arr[0] > 0 && arr[2] > 0)
                {
                    arr = repaintedIn(arr, Color);
                }
                else if (Color == 2 && arr[0] > 0 && arr[1] > 0)
                {
                    arr = repaintedIn(arr, Color);
                }
                else
                {
                    if (arr[0] > 0 && arr[1] > 0)
                    {
                        arr = repaintedIn(arr, 2);
                    }
                    else if (arr[0] > 0 && arr[2] > 0)
                    {
                        arr = repaintedIn(arr, 1);
                    }
                    else if (arr[1] > 0 && arr[2] > 0)
                    {
                        arr = repaintedIn(arr, 0);
                    }
                }

                countMoves++;
            }

            if (arr[Color] == arr.Sum())
            {
                return countMoves;
            }
            else
            {
                return -1;
            }
        }

        static int[] repaintedIn(int[] arr, int color)
        {
            int[] indexes = new int[] { 0, 1, 2 };
            indexes = indexes.Where(x => x != color).ToArray();
            arr[indexes[0]]--;
            arr[indexes[1]]--;
            arr[color] += 2;
            return arr;
        }
    }
}
