import recommendation_model_np as RM
import numpy as np
import sys

R = sys.argv[1].split(',')
shape = sys.argv[2].split(',')
shape = list(map(int, shape))
R = np.array(R, dtype=np.float32).reshape([shape[0], shape[1]])
# u1 = np.array([0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0])
# u2 = np.array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
# u3 = np.array([0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0])
# u4 = np.array([0, 3, 4, 0, 3, 0, 0, 2, 2, 0, 0])
# u5 = np.array([0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0])
# u6 = np.array([0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0])
# u7 = np.array([0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 5])
# u8 = np.array([0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4])
# u9 = np.array([0, 0, 0, 0, 0, 0, 5, 0, 0, 5, 0])
# u10 = np.array([0, 0, 0, 3, 0, 0, 0, 0, 4, 5, 0])

# R = np.array([u1, u2, u3, u4, u5, u6, u7, u8, u9, u10], dtype=np.float32)


model = RM.RecommendModel(R)
model.train()
# result = model.predict(3)
result = model.predict(int(sys.argv[3]))
for num in result:
    print(num)
