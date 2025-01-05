import pygame
import sys

# Initialize pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
YELLOW = (255, 255, 0)
BLUE = (0, 0, 255)

# Game variables
TILE_SIZE = 40
FPS = 60

# Initialize screen
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Pacman")

# Clock
clock = pygame.time.Clock()

# Pacman class
class Pacman:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.speed = 5
        self.radius = TILE_SIZE // 2 - 5

    def draw(self):
        pygame.draw.circle(screen, YELLOW, (self.x, self.y), self.radius)

    def move(self, keys):
        if keys[pygame.K_UP]:
            self.y -= self.speed
        if keys[pygame.K_DOWN]:
            self.y += self.speed
        if keys[pygame.K_LEFT]:
            self.x -= self.speed
        if keys[pygame.K_RIGHT]:
            self.x += self.speed

# Ghost class
class Ghost:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.color = BLUE
        self.speed = 3

    def draw(self):
        pygame.draw.circle(screen, self.color, (self.x, self.y), TILE_SIZE // 2 - 5)

# Main game loop
def main():
    pacman = Pacman(SCREEN_WIDTH // 2, SCREEN_HEIGHT // 2)
    ghosts = [Ghost(100, 100), Ghost(700, 500)]

    running = True
    while running:
        screen.fill(BLACK)

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        keys = pygame.key.get_pressed()
        pacman.move(keys)

        pacman.draw()
        for ghost in ghosts:
            ghost.draw()

        pygame.display.flip()
        clock.tick(FPS)

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()
