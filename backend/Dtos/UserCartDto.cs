namespace backend.Dtos
{
    public class UserCartDto
    {
        public string UserId { get; set; }
        public int MediaId { get; set; }
        public int Ranking { get; set; }
        public DateTime DateAdded { get; set; }
    }
}
