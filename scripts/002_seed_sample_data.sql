-- Insert sample categories
INSERT INTO public.categories (name, slug, description) VALUES
('Action', 'action', 'High-octane action movies and series'),
('Drama', 'drama', 'Compelling dramatic content'),
('Comedy', 'comedy', 'Funny movies and series'),
('Thriller', 'thriller', 'Suspenseful thrillers'),
('Sci-Fi', 'sci-fi', 'Science fiction content'),
('Horror', 'horror', 'Horror movies and series'),
('Romance', 'romance', 'Romantic content'),
('Documentary', 'documentary', 'Documentary films and series')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample content
INSERT INTO public.content (title, description, type, genre, release_year, duration_minutes, rating, imdb_rating, thumbnail_url, backdrop_url, is_featured, is_trending, category_id) VALUES
('The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'movie', ARRAY['Action', 'Crime', 'Drama'], 2008, 152, 'PG-13', 9.0, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', true, true, (SELECT id FROM public.categories WHERE slug = 'action')),
('Stranger Things', 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.', 'series', ARRAY['Drama', 'Fantasy', 'Horror'], 2016, 50, 'TV-14', 8.7, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', true, true, (SELECT id FROM public.categories WHERE slug = 'thriller')),
('The Office', 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.', 'series', ARRAY['Comedy'], 2005, 22, 'TV-14', 9.0, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', false, true, (SELECT id FROM public.categories WHERE slug = 'comedy')),
('Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'movie', ARRAY['Action', 'Sci-Fi', 'Thriller'], 2010, 148, 'PG-13', 8.8, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', true, false, (SELECT id FROM public.categories WHERE slug = 'sci-fi')),
('Breaking Bad', 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his familys future.', 'series', ARRAY['Crime', 'Drama', 'Thriller'], 2008, 47, 'TV-MA', 9.5, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', true, false, (SELECT id FROM public.categories WHERE slug = 'drama')),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'movie', ARRAY['Crime', 'Drama'], 1994, 154, 'R', 8.9, '/placeholder.svg?height=400&width=300', '/placeholder.svg?height=600&width=1200', false, false, (SELECT id FROM public.categories WHERE slug = 'drama'))
ON CONFLICT DO NOTHING;
