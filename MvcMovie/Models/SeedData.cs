using Microsoft.EntityFrameworkCore;
using MvcMovie.Data;

namespace MvcMovie.Models;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new MvcMovieContext(
            serviceProvider.GetRequiredService<DbContextOptions<MvcMovieContext>>());

        if (context.Movie.Any())
        {
            return;
        }

        context.Movie.AddRange(
            new Movie
            {
                Title = "The Devil Wears Prada",
                ReleaseDate = DateTime.Parse("2006-6-30"),
                Genre = "Comedy Drama",
                Price = 12.99M
            },
            new Movie
            {
                Title = "Inception",
                ReleaseDate = DateTime.Parse("2010-7-16"),
                Genre = "Sci-Fi",
                Price = 15.50M
            },
            new Movie
            {
                Title = "Titanic",
                ReleaseDate = DateTime.Parse("1997-12-19"),
                Genre = "Romance",
                Price = 10.00M
            },
            new Movie
            {
                Title = "Interstellar",
                ReleaseDate = DateTime.Parse("2014-11-7"),
                Genre = "Sci-Fi",
                Price = 16.20M
            }
        );

        context.SaveChanges();
    }
}