using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private readonly DataContext _context;

        public UserCartController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult> AddToCart([FromBody] UserCartDto dto)
        {
            var userCart = new UserCart()
            {
                MediaId = dto.MediaId,
                UserId = dto.UserId,
                DateAdded = DateTime.Now,
            };
            await _context.UserCarts.AddAsync(userCart);
            await _context.SaveChangesAsync();

            return Ok("Added item to user cart");
        }

        [HttpGet("GetCartItems/{id}")]
        public async Task<ActionResult<List<UserCart>>> GetUserCartByUserId([FromRoute] string id)
        {
            var cartItems = await _context.UserCarts
                                        .Where(i => i.UserId == id)
                                        .OrderByDescending(i => i.DateAdded) // Assuming Id is the property to order by
                                        .ToListAsync();

            if (cartItems is null)
            {
                return NotFound("Cart not found");
            }

            return Ok(cartItems);
        }


        [HttpDelete("DeleteCartItem/{userId}/{mediaId}")]
        public async Task<ActionResult> DeleteItemByMediaId([FromRoute] string userId, [FromRoute] int mediaId)
        {
            var cartItem = await _context.UserCarts.FirstOrDefaultAsync(i => i.UserId == userId && i.MediaId == mediaId);
            if (cartItem is null)
            {
                return NotFound("Cart Not Found");
            }
            _context.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item removed");
        }

        [HttpDelete("DeleteAllItems/{id}")]
        public async Task<ActionResult<List<UserCart>>> DeleteAllItems([FromRoute] string id)
        {
            var cartItems = await _context.UserCarts.Where(i => i.UserId == id).ToListAsync();
            if (cartItems.Count == 0)
            {
                return NotFound("Cart Not Found");
            }

            _context.UserCarts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok("All items removed");
        }


        [HttpPatch("AddRanking/{userId}/{cartItemId}/{rankId}")]
        public async Task<ActionResult> AddRanking([FromRoute] string userId, [FromRoute] int cartItemId, [FromRoute] int rankId)
        {
            var rank = await _context.UserCarts.FirstOrDefaultAsync(u => u.UserId == userId && u.CartItemId == cartItemId);
            if (rank is null)
            {
                return NotFound("Item not found");
            }

            rank.Ranking = rankId;

            await _context.SaveChangesAsync();
            return Ok("Added ranking");
        }

        [HttpDelete("DeleteCartItem/{id}")]
        public async Task<ActionResult> DeleteCartItem([FromRoute] int id)
        {
            var cartItem = await _context.UserCarts.FirstOrDefaultAsync(c => c.CartItemId == id);
            if (cartItem is null)
            {
                return NotFound("Item not found");
            }

            _context.UserCarts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Item deleted");
        }

        [HttpGet("GetRankingsMovies/{id}")]
        public async Task<ActionResult<List<object>>> GetRankingsMovies([FromRoute] string id)
        {
            var rankings = await _context.UserCarts
                .Include(u => u.Media)
                .Where(u => u.UserId == id && u.Media.MediaType == "movie") // Filter by mediaType
                .OrderByDescending(u => u.Ranking)
                .Select(u => new
                {
                    Cover = u.Media.Cover,
                    Ranking = u.Ranking
                })
                .ToListAsync();

            if (rankings == null || !rankings.Any())
            {
                return NotFound("No rankings found for movies.");
            }

            return Ok(rankings);
        }

        [HttpGet("GetRankingsBooks/{id}")]
        public async Task<ActionResult<List<object>>> GetRankingsBooks([FromRoute] string id)
        {
            var rankings = await _context.UserCarts
                .Include(u => u.Media)
                .Where(u => u.UserId == id && u.Media.MediaType == "book") // Filter by mediaType
                .OrderByDescending(u => u.Ranking)
                .Select(u => new
                {
                    Cover = u.Media.Cover,
                    Ranking = u.Ranking
                })
                .ToListAsync();

            if (rankings == null || !rankings.Any())
            {
                return NotFound("No rankings found for movies.");
            }

            return Ok(rankings);
        }

        [HttpGet("GetRanking/{userId}/{userCartId}")]
        public async Task<ActionResult> GetRanking([FromRoute] string userId, [FromRoute] int userCartId)
        {
            var rank = await _context.UserCarts
                .Where(u => u.UserId == userId && u.CartItemId == userCartId)
                .Select(u => new
                {
                    Ranking = u.Ranking
                })
                .FirstOrDefaultAsync();

            if (rank == null)
            {
                return NotFound("Rank not found");
            }

            return Ok(rank);
        }

        [HttpGet("GetAverageRanking/{mediaId}")]
        public async Task<ActionResult<double>> GetAverageRanking([FromRoute] int mediaId)
        {
            try
            {
                // Fetch all user ratings for the given mediaId
                var ratings = await _context.UserCarts
                    .Where(cart => cart.MediaId == mediaId && cart.Ranking != null)
                    .Select(cart => cart.Ranking)
                    .ToListAsync();

                // Calculate the average rating
                if (ratings.Any())
                {
                    double averageRanking = ratings.Average();
                    return Ok(averageRanking);
                }
                else
                {
                    // No ratings found for the given mediaId
                    return NotFound("No ratings found for the given mediaId.");
                }
            }
            catch (Exception ex)
            {
                // Handle any exceptions
                return StatusCode(500, $"An error occurred while retrieving the average ranking: {ex.Message}");
            }
        }



    }
}
